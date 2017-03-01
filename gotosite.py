from flask import Flask, render_template
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

app = Flask(__name__)

admin = Admin(app, name='microblog', template_mode='bootstrap3')


@app.route('/')
def hello_world():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
