from flask import jsonify
from app.models import User
from app.extensions import db
from app.services.auth_service import generate_jwt_token, decode_jwt_token
from app.services.token_service import blacklist_token

def register_user(request):
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'User already exists'}), 400

    user = User(username=username)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201


def login_user(request):
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        token = generate_jwt_token(user.id)
        return jsonify({'token': token}), 200

    return jsonify({'message': 'Invalid credentials'}), 401


def logout_user(request):
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'message': 'Token is missing'}), 401

    user_id = decode_jwt_token(token)
    if user_id is None:
        return jsonify({'message': 'Invalid or expired token'}), 401

    blacklist_token(token)
    return jsonify({'message': 'Successfully logged out'}), 200
