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
        # check if username is already in database
        exists = db.session.query(User.username).filter_by(username=username)
        if exists.first() is None: # user does not exist
            db.session.add(new_user)
            db.session.commit()
            return jsonify(success=True, data="Successfully Registered User")
        else:
            return jsonify(success=False, data="Failed to register, username taken")

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


@app.route('/recipe', methods=['POST'])
def storeRecipe():
    if request.method != 'POST':
        return jsonify(success=False, data="Not a POST request")
        # return unsuccessful

    recipe_name = request.form['recipeName']
    ingredients = request.form['ingredients'] # dict (item:volume:potentially unit)
    
    steps = request.form['steps'] # dict (numerical:step)
    img = request.files['img']
    tags = request.form['tags']
    tagList = tags.split(",")
    print(tagList)

    from dotenv import load_dotenv
    load_dotenv()

    # Import the Cloudinary libraries
    # ==============================
    import cloudinary
    from cloudinary import CloudinaryImage
    import cloudinary.uploader
    import cloudinary.api

    #upload image to cloudinary, build a URL to save to DB
    cloudinary.uploader.upload(img, public_id=recipe_name) # recipe names should be unique
    imgURL = CloudinaryImage(recipe_name).build_url()

    # take the incoming post data, should be img, ingredients, steps, put in DB

    with sqlite3.connect("test1.db") as con:
        cur = con.cursor()
        cur.execute("CREATE TABLE if not exists Recipes(itemID integer primary key, name, ingredients, steps, imgURL)")
        cur.execute("CREATE TABLE if not exists Tags (tagID integer primary key, tagTitle)")
        cur.execute("CREATE TABLE if not exists ItemTags (itemID, tagID)")

        cur.execute("INSERT INTO Recipes VALUES (NULL, ?, ?, ?, ?)", (recipe_name, ingredients, steps, imgURL))

        recipeList = []
        for row in cur.execute("SELECT * FROM Recipes"):
        #    print(row)
            recipeList.append(row)

        #print(recipeList)
        #for row in cur.execute("SELECT * FROM Tags"):
        #    print(row)
        #for row in cur.execute("SELECT * FROM ItemTags"):
        #    print(row)
        # if tag does not exist in table Tags
        # insert the new tag at the end with increasing ID

    # returns all recipes as an array of objects to front end
    return jsonify(success=True, data=recipeList)


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)