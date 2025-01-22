from flask import Flask, request, jsonify
from app.config import Config
from app.extensions import db, migrate
from app.routes.auth import auth_bp
from app.routes.profile import profile_bp
from app.routes.mood import mood_bp
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    CORS(app, origins="http://localhost:5173", supports_credentials=True)
    migrate.init_app(app, db)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/v1/auth')
    app.register_blueprint(profile_bp, url_prefix='/api/v1/profile')
    app.register_blueprint(mood_bp, url_prefix='/api/v1/mood')

    with app.app_context():
        db.create_all()

        @app.before_request
        def handle_options_request():
            if request.method == "OPTIONS":
                response = jsonify({'status': 'OK'})
                response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
                response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
                response.headers.add('Access-Control-Allow-Headers', 'Authorization, Content-Type')
                response.headers.add('Access-Control-Allow-Credentials', 'true')
                return response, 200

    return app
