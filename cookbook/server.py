from flask import Flask, request, render_template, jsonify

# flask user login
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, LoginManager, login_user, logout_user, login_required
from flask_bcrypt import Bcrypt

import sqlite3
from flask_cors import CORS
import requests
import json
app = Flask(__name__)
CORS(app)

# flask login stuff
login_manager = LoginManager(app)
bcrypt = Bcrypt(app)

# db for storing users
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SECRET_KEY'] = 'this is a secret key '
db = SQLAlchemy(app)

# user obj
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    # is_active = db.Column(db.Boolean(), default=True)

    def __repr__(self):
        return f'<User {self.username}>'

# returns user obj w/ given ID
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))



# logins the user
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        jsonData = request.get_json()
        username = jsonData['username']
        password = jsonData['password']

        # check if username exists, then if hashed password matches
        user = User.query.filter_by(username=username).first()
        if user and bcrypt.check_password_hash(user.password, password):

            #login if so
            login_user(user)
            return jsonify(success=True, data="Successfully logged in")
        
        else:
            return jsonify(success=False, data="Incorrect username/password")

    return jsonify(success=False, data="Not even a post request")

# registers the given user
@app.route('/signup', methods=['POST'])
def signup():
    if request.method == 'POST':
        jsonData = request.get_json()
        username = jsonData['username']
        password = jsonData['password']

        # store username w/ hashed password in database
        hashed_password = bcrypt.generate_password_hash(
            password).decode('utf-8')
        new_user = User(username=username, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify(success=True, data="Successfully Registered User")

    return jsonify(success=False, data="Failed to register")


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify(success=True, data="logged out")



@app.route('/', methods=['GET', 'POST'])
def helloWorld():
    return "hello"

@app.route('/index')
def hello():
    return render_template('main.html')

@app.route('/tex', methods=['POST'])
def get_t():
    if request.method == 'POST':
        print("post")
        jsonData = request.get_json()
        print(jsonData)
        print(jsonData['firstParam'])
        print(jsonData['secondParam'])
    else:
        print("maybe a get")
    return jsonify(success=True, data="write this lol")
    #response = jsonify({'text': request.args['text'] + 'this is a set text from the server lol'})
    #return response

@app.route('/recipe', methods=['POST'])
def storeRecipe():
    if request.method != 'POST':
        return jsonify(success=False, data="Not a POST request")
        # return unsuccessful
    # take the incoming post data, should be img, ingredients, steps, put in DB
    # we'll add checks later to see if database already exists
    con = sqlite3.connect("test.db")
    cur = con.cursor()
    cur.execute("CREATE TABLE recipe(id, image, ingredients, name, category)")

    jsonData = request.get_json()
   # img = jsonData['img']
    ingredients = jsonData['ingredients'] # dict (item:volume:potentially unit)
    steps = jsonData['steps'] # dict (numerical:step)
    print(ingredients)
    print(steps)

    # store in database
    return jsonify(success=True, data="Recipe saved")


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)