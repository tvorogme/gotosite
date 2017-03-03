import os
from flask import Flask, url_for, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_security import Security, SQLAlchemyUserDatastore
import flask_admin
from flask_admin import helpers as admin_helpers

app = Flask(__name__)
app.config.from_pyfile('config.py')
db = SQLAlchemy(app)
admin = flask_admin.Admin(
    app,
    'Example: Auth',
    base_template='my_master.html',
    template_mode='bootstrap3',
)


# Flask views
@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    from models import Role, User, MyModelView

    user_datastore = SQLAlchemyUserDatastore(db, User, Role)
    security = Security(app, user_datastore)


    @security.context_processor
    def security_context_processor():
        return dict(
            admin_base_template=admin.base_template,
            admin_view=admin.index_view,
            h=admin_helpers,
            get_url=url_for
        )


    admin.add_view(MyModelView(Role, db.session))
    admin.add_view(MyModelView(User, db.session))

    # Build a sample db on the fly, if one does not exist yet.
    app_dir = os.path.realpath(os.path.dirname(__file__))
    database_path = os.path.join(app_dir, app.config['DATABASE_FILE'])

    # Start app
    app.run(debug=True)
