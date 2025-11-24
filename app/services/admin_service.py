from app.models.admin import Admin
from app.extensions import db
from app.schemas.admin_schema import admin_schema

def get_all():
    return Admin.query.all()

def get_by_id(id_admin):
    admin = Admin.query.get(id_admin)
    if not admin:
        abort(404, 'Admin não encontrado')
    return admin

def create(data):
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not all([username, email, password]):
        raise ValueError("Campos obrigatórios: username, email, password")

    admin = Admin(username=username, email=email)
    admin.set_password(password)  # gera o hash

    db.session.add(admin)
    db.session.commit()
    return admin


def update(id_admin, data):
    admin = get_by_id(id_admin)
    for field in ['username', 'email', 'password']:
        if field in data:
            setattr(admin, field, data[field])
    db.session.commit()
    return admin

def delete(id_admin):
    admin = get_by_id(id_admin)
    db.session.delete(admin)
    db.session.commit()
