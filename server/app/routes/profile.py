from flask import Blueprint, request, jsonify
from app.models import User
from app.services.auth_service import decode_jwt_token
from app.services.token_service import is_token_blacklisted
from app.extensions import db

profile_bp = Blueprint('profile', __name__)

@profile_bp.before_request
def verify_token():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'message': 'Token is missing'}), 401
    if is_token_blacklisted(token):
        return jsonify({'message': 'Invalid token'}), 401
    user_id = decode_jwt_token(token)
    if not user_id:
        return jsonify({'message': 'Invalid or expired token'}), 401
    request.user_id = user_id

@profile_bp.route('/view', methods=['GET'])
def view_profile():
    user = User.query.get(request.user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    return jsonify({
        'id': user.id,
        'username': user.username
    }), 200

@profile_bp.route('/update', methods=['PUT'])
def update_profile():
    user = User.query.get(request.user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    data = request.json
    if 'username' in data:
        user.username = data['username']

    db.session.commit()
    return jsonify({'message': 'Profile updated successfully'}), 200
