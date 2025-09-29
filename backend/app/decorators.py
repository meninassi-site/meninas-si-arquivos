from functools import wraps
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from app.models.admin import Admin

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            verify_jwt_in_request()
            admin_id = get_jwt_identity()
            admin = Admin.query.get(admin_id)
            
            if not admin:
                return jsonify({'error': 'Admin not found'}), 404
                
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({'error': 'Invalid or expired token'}), 401
    return decorated_function