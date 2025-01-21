from flask import Blueprint, request, jsonify
from app.models import User
from app.services.token_service import decode_jwt_token, is_token_blacklisted
from app.services.gemini_service import setup_gemini_api
from app.services.spotify_service import setup_spotify_api, recommend_songs
from app.services.mood_detection import detect_mood
from app.extensions import db

mood_bp = Blueprint('mood', __name__)

@mood_bp.before_request
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


@mood_bp.route('/recommend-song', methods=['POST'])
def analyze_mood():
    data = request.get_json()
    if not data or "text" not in data:
        return jsonify({"error": "Invalid input, 'text' field is required"}), 400

    user_text = data["text"]
    gemini_model = setup_gemini_api()
    spotify_client = setup_spotify_api()

    if not gemini_model:
        return jsonify({"error": "Gemini API is not configured"}), 500

    mood = detect_mood(gemini_model, user_text)
    if not mood:
        return jsonify({"error": "Unable to detect mood"}), 500

    recommendations = recommend_songs(mood, spotify_client)
    return jsonify({"mood": mood, "recommendations": recommendations})