from main import db, app
from flask_admin.contrib import sqla
from flask_security import UserMixin, RoleMixin, current_user
from flask import url_for, redirect, request, abort
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from lang.ru_RU import user_labels


class GoToAdminView(sqla.ModelView):
    column_exclude_list = ['password', 'active', 'confirmed_at', 'roles', 'position', 'organization', 'email_verified',
                           'subscribed_to_email', 'email', 'education_years']

    column_labels = user_labels

    def is_accessible(self):
        if not current_user.is_active or not current_user.is_authenticated:
            return False

        if current_user.has_role('админ'):
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


class Event_type(db.Model):
    __tablename__ = 'events_type'

    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(255))

    def __str__(self):
        return self.name

    def __init__(self, iterator: dict):
        for field_name in iterator:
            setattr(self, field_name, iterator[field_name])


roles_users = db.Table(
    'roles_users',
    db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
    db.Column('role_id', db.Integer(), db.ForeignKey('role.id'))
)


class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    skill_name = db.Column(db.String(60))

    def __str__(self):
        return self.skill_name


user_skills = db.Table(
    'user_skills',
    db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
    db.Column('skill_id', db.Integer(), db.ForeignKey('skill.id'))
)


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)

    # Basics
    first_name = db.Column(db.String(40))
    last_name = db.Column(db.String(40))
    surname = db.Column(db.String(40))
    email = db.Column(db.String(40), unique=True)

    # Special for lectors
    organization = db.Column(db.String(40))
    position = db.String(70)

    # Special for participant
    city = db.Column(db.String(40))
    birthday = db.Column(db.Date())
    phone_number = db.Column(db.String(12))
    parent_phone_number = db.Column(db.String(12))
    health_issues = db.Column(db.Text())
    education_name = db.Column(db.String(40))
    education_years = db.Column(db.Integer())
    skills = db.relationship('Skill', secondary=user_skills,
                             backref=db.backref('users', lazy='dynamic'))

    # Specific
    active = db.Column(db.Boolean())
    confirmed_at = db.Column(db.DateTime())
    roles = db.relationship('Role', secondary=roles_users,
                            backref=db.backref('users', lazy='dynamic'))
    password = db.Column(db.String(255))
    email_verified = db.Column(db.Boolean())

    # Subscribe
    subscribed_to_email = db.Column(db.Boolean())

    def __init__(self, iterator: dict):
        for field_name in iterator:
            setattr(self, field_name, iterator[field_name])

    def __str__(self):
        return "%s %s" % (self.first_name, self.last_name)


project_team = db.Table(
    'project_team',
    db.Column('project_id', db.Integer(), db.ForeignKey('project.id')),
    db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
)


class Project(db.Model):
    __tablename__ = "project"

    id = db.Column(db.Integer, primary_key=True)

    team = db.relationship(
        "User",
        secondary=project_team,
        backref=db.backref('project', lazy='dynamic'))

    url = db.Column(db.String(60))
    name = db.Column(db.String(40))
    description = db.Column(db.Text())
    date_started = db.Column(db.DateTime())


class Application(db.Model):
    __tablename__ = "aplications"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer())
    event_id = db.Column(db.Integer())

    def __init__(self, iterator: dict):
        for field_name in iterator:
            setattr(self, field_name, iterator[field_name])


class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    type = db.Column(db.String(255))

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
