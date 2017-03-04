from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import flask_admin

app = Flask(__name__)
app.config.from_pyfile('config.py')
db = SQLAlchemy(app)
admin = flask_admin.Admin(
    app,
    'Example: Auth',
    base_template='my_master.html',
    template_mode='bootstrap3',
)
