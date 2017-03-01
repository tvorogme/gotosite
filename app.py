from flask import Flask

app = Flask(__name__)
import os

app.config.from_object(os.environ['APP_SETTINGS'])
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy(app)

@app.route('/')
def hello():
    return "Hello World!"


@app.route('/<name>')
def hello_name(name):
    return "Hello {}!".format(name)


if __name__ == '__main__':
    import flask_login as login


    def init_login():
        login_manager = login.LoginManager()
        login_manager.init_app(app)

        # Create user loader function
        @login_manager.user_loader
        def load_user(user_id):
            return db.session.query(User).get(user_id)


    init_login()

    import admin_page
    import flask_admin as admin

    admin = admin.Admin(app, 'Example: Auth', index_view=admin_page.MyAdminIndexView(), base_template='my_master.html')

    from models import User

    admin.add_view(admin_page.MyModelView(User, db.session))

    app.run()
