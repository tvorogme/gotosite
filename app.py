import os
from flask import url_for, render_template, request, abort, redirect
from flask_admin import helpers as admin_helpers
from flask_login import current_user, login_required
from flask_security import Security, SQLAlchemyUserDatastore
from flask_security.utils import encrypt_password
from flask_wtf import Form
from wtforms.ext.sqlalchemy.orm import model_form
from helpers import get_need_fields_for_application, get_fields_validators
from main import app, db, admin
from models import Role, User, GoToAdminView, Event, Application, Event_type
from config import INIT_DB, DEBUG, PORT, HOST

user_datastore = SQLAlchemyUserDatastore(db, User, Role)
security = Security(app, user_datastore)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/camp')
def camp():
    last_event = Event.query.first()
    return render_template("camp.html", event=last_event)


@app.route('/camp/take_part', methods=["GET", "POST"])
@login_required
def takepart_camp():
    last_event = Event.query.first()

    fields = get_need_fields_for_application(current_user)
    validators = get_fields_validators(fields)

    take_part_form = model_form(User, Form, only=fields, field_args=validators)
    take_part_form = take_part_form(name='take_part')

    if not current_user.has_role('участник'):
        user = user_datastore.find_user(email=current_user.email)
        user_datastore.add_role_to_user(user, Role(name="участник"))
        db.session.commit()

    if request.method == 'POST':
        model = User.query.filter_by(email=current_user.email).first()
        take_part_form = model_form(User, Form, only=fields, field_args=validators)
        take_part_form = take_part_form(request.form)

        if take_part_form.validate():
            for field in fields:
                setattr(model, field, getattr(getattr(take_part_form, field), "data"))

            last_camp = Event.query.filter_by(type="camp").first()
            db.session.add(Application({"user_id": current_user.id, "event_id": last_camp.id}))
            db.session.commit()

            return redirect("/")

    return render_template("take_part.html", event=last_event, user_form=take_part_form)


@app.before_request
def check_for_admin(*args, **kw):
    if request.path == '/admin/':
        if not current_user.is_active or not current_user.is_authenticated or not current_user.has_role('админ'):
            return abort(404)


@security.context_processor
def security_context_processor():
    return dict(
        admin_base_template=admin.base_template,
        admin_view=admin.index_view,
        h=admin_helpers,
        get_url=url_for
    )


admin.add_view(GoToAdminView(User, db.session, name="Пользователи"))
admin.add_view(GoToAdminView(Event, db.session, name="Мероприятия"))

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
