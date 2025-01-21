from flask import Flask
from app.config import Config
from app.extensions import db, migrate
from app.routes.auth import auth_bp
from app.routes.profile import profile_bp
from app.routes.mood import mood_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/v1/auth')
    app.register_blueprint(profile_bp, url_prefix='/api/v1/profile')
    app.register_blueprint(mood_bp, url_prefix='/api/v1/mood')

    with app.app_context():
        db.create_all()

    return app
