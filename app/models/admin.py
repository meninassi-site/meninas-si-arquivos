from app.extensions import db
from flask_bcrypt import Bcrypt
from datetime import datetime
import jwt
from flask import current_app

bcrypt = Bcrypt()

class Admin(db.Model):
    __tablename__ = 'admin'
    
    id_admin = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    
    # Relacionamentos existentes
    events = db.relationship('Event', backref='admin', lazy=True)
    short_courses = db.relationship('ShortCourse', backref='admin', lazy=True)
    workshops = db.relationship('Workshop', backref='admin', lazy=True)
    
    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
    
    def generate_auth_token(self, expires_in=3600):
        payload = {
            'admin_id': self.id_admin,
            'username': self.username,
            'exp': datetime.utcnow() + datetime.timedelta(seconds=expires_in)
        }
        return jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')
    
    @staticmethod
    def verify_auth_token(token):
        try:
            payload = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            return Admin.query.get(payload['admin_id'])
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
            return None
    
    def to_dict(self):
        return {
            'id_admin': self.id_admin,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }