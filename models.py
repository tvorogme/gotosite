from main import db, app
from flask_admin.contrib import sqla
from flask_security import UserMixin, RoleMixin, current_user
from flask import url_for, redirect, request, abort
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager

class MyModelView(sqla.ModelView):
    def is_accessible(self):
        if not current_user.is_active or not current_user.is_authenticated:
            return False

        if current_user.has_role('superuser'):
            return True

        return False

    def _handle_view(self, name, **kwargs):
        if not self.is_accessible():
            if current_user.is_authenticated:
                abort(403)
            else:
                return redirect(url_for('security.login', next=request.url))


class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))

    def __str__(self):
        return self.name


roles_users = db.Table(
    'roles_users',
    db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
    db.Column('role_id', db.Integer(), db.ForeignKey('role.id'))
)


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    confirmed_at = db.Column(db.DateTime())
    roles = db.relationship('Role', secondary=roles_users,
                            backref=db.backref('users', lazy='dynamic'))

    surname = db.Column(db.String(255))
    about = db.Column(db.Text())
    organization = db.Column(db.String(255))
    email_verified = db.Column(db.Boolean())

    city = db.Column(db.String(40))

    birthday = db.Column(db.DateTime())
    phone_number = db.Column(db.String(40))
    parent_phone_number = db.Column(db.String(40))
    health_issues = db.Column(db.Text())

    programming_languages = db.Column(db.Text())
    experience = db.Column(db.Text())

    education_name = db.Column(db.String(255))
    education_years = db.Column(db.Integer())
    graduation_year = db.Column(db.Integer())
    subscribed_to_email = db.Column(db.Boolean())
    position = db.String(140)

    def __str__(self):
        return self.email



class Application(db.Model):
    __tablename__ = "aplications"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer())
    event_id = db.Column(db.Integer())


class Event(db.Model):
    __tablename__ = 'events'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))

    first_title = db.Column(db.String(255))
    second_title = db.Column(db.String(255))
    third_title = db.Column(db.String(255))

    full_description = db.Column(db.Text())

    first_shar = db.Column(db.String(255))
    second_shar = db.Column(db.String(255))
    third_shar = db.Column(db.String(255))
    fourth_shar = db.Column(db.String(255))

    lon = db.Column(db.Float())
    lat = db.Column(db.Float())

    def __str__(self):
        return self.name

    def __repr__(self):
        return "<Event {}>".format(self.name)


if __name__ == '__main__':
    db.create_all()

    manager = Manager(app)
    migrate = Migrate(app, db)
    manager.add_command('db', MigrateCommand)
    manager.run()
