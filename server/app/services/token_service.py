from app.models import BlacklistedToken
from app.extensions import db

def blacklist_token(token):
    if not is_token_blacklisted(token):
        blacklisted_token = BlacklistedToken(token=token)
        db.session.add(blacklisted_token)
        db.session.commit()

def is_token_blacklisted(token):
    return BlacklistedToken.query.filter_by(token=token).first() is not None
