from flask import current_app
import jwt
from datetime import datetime, timedelta
from app.models import BlacklistedToken
from app.extensions import db

def generate_jwt_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.utcnow() + timedelta(hours=1)
    }
    return jwt.encode(payload, current_app.config['JWT_SECRET_KEY'], algorithm='HS256')

def decode_jwt_token(token):
    try:
        payload = jwt.decode(token, current_app.config['JWT_SECRET_KEY'], algorithms=['HS256'])
        return payload['user_id']
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def blacklist_token(token):
    if not is_token_blacklisted(token):
        blacklisted_token = BlacklistedToken(token=token)
        db.session.add(blacklisted_token)
        db.session.commit()

def is_token_blacklisted(token):
    return BlacklistedToken.query.filter_by(token=token).first() is not None