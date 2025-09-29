from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
ma = Marshmallow()
migrate = Migrate()
bcrypt = Bcrypt()
jwt = JWTManager()