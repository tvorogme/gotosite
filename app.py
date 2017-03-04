import os
from main import app, db, admin
from flask import url_for, render_template, request, abort
from flask_security import Security, SQLAlchemyUserDatastore
from flask_admin import helpers as admin_helpers
from flask_login import current_user
from models import Role, User, MyModelView, Event


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/camp')
def camp():
    last_event = Event.query.first()
    return render_template("camp.html", event=last_event)

@app.route('/camp/take_part')
def takepart_camp():
    last_event = Event.query.first()
    return render_template("take_part.html", event=last_event)


@app.before_request
def check_for_admin(*args, **kw):
    if request.path == '/admin/':
        if not current_user.is_active or not current_user.is_authenticated or not current_user.has_role('superuser'):
            return abort(404)


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
admin.add_view(MyModelView(Event, db.session))

# Build a sample db on the fly, if one does not exist yet.
app_dir = os.path.realpath(os.path.dirname(__file__))
database_path = os.path.join(app_dir, app.config['DATABASE_FILE'])

if __name__ == '__main__':
    # Start app
    app.run(debug=True)
