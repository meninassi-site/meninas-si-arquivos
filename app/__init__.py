from flask import Flask
from .extensions import db, ma, migrate, bcrypt, jwt
from .config import Config

from .routes.admin_routes import admin_bp
from .routes.event_routes import event_bp
from .routes.member_routes import member_bp
from .routes.short_course_routes import short_course_bp
from .routes.workshop_routes import workshop_bp
from .routes.auth_routes import auth_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Inicializar extensões
    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)

    # ✅ Importar todos os modelos antes de registrar blueprints
    from app import models  # <-- Adicione esta linha

    # Registrar blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(admin_bp, url_prefix='/admin')
    app.register_blueprint(event_bp, url_prefix='/eventos')
    app.register_blueprint(member_bp, url_prefix='/membros')
    app.register_blueprint(short_course_bp, url_prefix='/cursos')
    app.register_blueprint(workshop_bp, url_prefix='/oficinas')  # <-- Corrigi o nome aqui também

    return app
