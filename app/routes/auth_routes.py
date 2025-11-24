from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.extensions import db, bcrypt
from app.models.admin import Admin

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Validação dos dados
        if not data or not data.get('username') or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Username, email and password are required'}), 400
        
        # Verificar se o usuário já existe
        if Admin.query.filter_by(username=data['username']).first():
            return jsonify({'error': 'Username already exists'}), 400
        
        if Admin.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already exists'}), 400
        
        # Criar novo admin
        admin = Admin(
            username=data['username'],
            email=data['email']
        )
        admin.set_password(data['password'])
        
        db.session.add(admin)
        db.session.commit()
        
        return jsonify({
            'message': 'Admin created successfully',
            'admin': admin.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data or not data.get('username') or not data.get('password'):
            return jsonify({'error': 'Username and password are required'}), 400
        
        admin = Admin.query.filter_by(username=data['username']).first()
        
        if not admin or not admin.check_password(data['password']):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        if not admin.is_active:
            return jsonify({'error': 'Account is deactivated'}), 401
        
        # Gerar token JWT
        access_token = create_access_token(
            identity=admin.id_admin,
            additional_claims={'username': admin.username}
        )
        
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'admin': admin.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        admin_id = get_jwt_identity()
        admin = Admin.query.get(admin_id)
        
        if not admin:
            return jsonify({'error': 'Admin not found'}), 404
        
        return jsonify({
            'admin': admin.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/change-password', methods=['PUT'])
@jwt_required()
def change_password():
    try:
        admin_id = get_jwt_identity()
        data = request.get_json()
        
        if not data or not data.get('current_password') or not data.get('new_password'):
            return jsonify({'error': 'Current password and new password are required'}), 400
        
        admin = Admin.query.get(admin_id)
        
        if not admin.check_password(data['current_password']):
            return jsonify({'error': 'Current password is incorrect'}), 400
        
        admin.set_password(data['new_password'])
        db.session.commit()
        
        return jsonify({'message': 'Password updated successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # Com JWT, o logout é feito no cliente descartando o token
    return jsonify({'message': 'Logout successful'}), 200