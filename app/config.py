import os
from datetime import timedelta

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    # Configurações do banco de dados
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Configurações de segurança
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'sua-chave-secreta-muito-segura-aqui-meninassi'
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'sua-chave-jwt-muito-segura-meninassi'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    
    # Configurações de upload
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    UPLOAD_FOLDER = os.path.join(basedir, 'uploads')