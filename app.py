import os
from flask import url_for, render_template, request, abort, redirect, send_from_directory
from flask_admin import helpers as admin_helpers
from flask_login import current_user, login_required
from flask_security import Security, SQLAlchemyUserDatastore
from flask_security.utils import encrypt_password
from flask_wtf import Form
from wtforms.ext.sqlalchemy.orm import model_form
from helpers import get_need_fields_for_application, get_fields_validators
from main import app, db, admin
from models import Role, User, GoToAdminView, Event, Application, Event_type, Projects
from config import INIT_DB, DEBUG, PORT, HOST, SOCIALS
from json import dumps

user_datastore = SQLAlchemyUserDatastore(db, User, Role)
security = Security(app, user_datastore)


#
#  INDEX PAGES
#


@app.route('/')
def index():
    # Just render the index page
    return render_template('pages/index.html', socials=SOCIALS, user=current_user)


#
#   CAMP PAGES
#

@app.route('/camp')
def camp():
    # Get last camp event
    last_event = Event.query.filter_by(type="camp").first()

    # Render it!
    return render_template("pages/camp.html", event=last_event)


@app.route('/camp/take_part', methods=["GET", "POST"])
@login_required
def takepart_camp():
    # Get last camp event
    last_event = Event.query.filter_by(type="camp").first()

    # Get fields for user
    fields = get_need_fields_for_application(current_user)

    # Generate validators
    validators = get_fields_validators(fields)

    # Create form from fields and validators
    take_part_form = model_form(User, Form, only=fields, field_args=validators)

    # Build form
    take_part_form = take_part_form(name='take_part')

    if not current_user.has_role('участник'):
        # Get user object
        user = user_datastore.find_user(email=current_user.email)

        # Set участник label
        user_datastore.add_role_to_user(user, Role(name="участник"))

        # Update user
        db.session.commit()

    # If receive data
    if request.method == 'POST':
        # Get user
        user = User.query.filter_by(email=current_user.email).first()

        # Create another form
        take_part_form = model_form(User, Form, only=fields, field_args=validators)

        # Build it with received values
        take_part_form = take_part_form(request.form)

        # If it valid
        if take_part_form.validate():

            # Save data
            for field in fields:
                setattr(user, field, getattr(getattr(take_part_form, field), "data"))
            # Get last camp
            last_camp = Event.query.filter_by(type="camp").first()

            # Add application form
            db.session.add(Application({"user_id": current_user.id, "event_id": last_camp.id}))

            # Save it
            db.session.commit()

            # Redirect to profile page
            return redirect("/camp")

    # Render camp with event and form
    return render_template("pages/take_part.html", event=last_event, user_form=take_part_form)


#
# Profile funcs
#

@app.route('/profile')
@login_required
def get_profile():

    # Get user projects
    projects = Projects.query.filter_by(user_id=current_user.id).all()

    # Just render current user information
    return render_template('profile/profile.html', user=current_user, projects=projects)


@app.route('/profile/edit/', methods=['POST'])
@login_required
def edit_profile():
    # Here we store field errors
    errors = ""

    # Alias request.form to data
    data = request.form

    # Get received fields
    fields = data.keys()

    # Get validators for all fields
    validators = get_fields_validators(fields)

    # Generate form
    form = model_form(User, Form, only=fields, field_args=validators)

    # Build form
    form = form(data)

    # If form valid
    if form.validate():
        # Get user
        user = User.query.filter_by(email=current_user.email).first()

        # Save data
        for key in data.keys():
            setattr(user, key, data[key])

        # Save it
        db.session.commit()

    else:
        # Save errors
        errors = dumps(form.errors.items())

    return errors


#
# HELPERS FUNCS
#

@app.before_request
def check_for_admin(*args, **kw):
    # If user want to get admin page
    if request.path == '/admin/':
        # And he has no rights
        if not current_user.is_active or not current_user.is_authenticated or not current_user.has_role('админ'):
            # 404
            return abort(404)


@security.context_processor
def security_context_processor():
    return dict(
        admin_base_template=admin.base_template,
        admin_view=admin.index_view,
        h=admin_helpers,
        get_url=url_for
    )


#
#   HOST JS AND CSS FILES
#


@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)


@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('css', path)


# Add labels to admin page
admin.add_view(GoToAdminView(User, db.session, name="Пользователи"))
admin.add_view(GoToAdminView(Event, db.session, name="Мероприятия"))
admin.add_view(GoToAdminView(Projects, db.session, name="Проекты"))

app_dir = os.path.realpath(os.path.dirname(__file__))
database_path = os.path.join(app_dir, app.config['DATABASE_FILE'])


def build_sample_db():
    db.drop_all()
    db.create_all()

    with app.app_context():
        for event in ["школа", "интенсив", "хакатон", "лекторий"]:
            db.session.add(Event_type(dict(name=event)))

        for role in ["yчастник", "преподаватель", "лектор"]:
            db.session.add(Role(name=role))

        admin_role = Role(name="админ")

        db.session.add(User(dict(
            first_name='Admin',
            email='admin',
            password=encrypt_password('admin'),
            active=1,
            roles=[admin_role]
        )))

        db.session.commit()

    return


if __name__ == '__main__':
    if INIT_DB:
        build_sample_db()

    app.run(debug=DEBUG, port=PORT, host=HOST)
