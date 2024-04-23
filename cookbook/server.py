from flask import Flask, request, render_template, jsonify
import sqlite3
from flask_cors import CORS
import requests
import json
app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET', 'POST'])
def helloWorld():
    return "hello"
    """if request.get.args('text', None):
        print("test " + request.args['text'])
        return "Hello world " + request.args['text']
     params = {
        'thing1': request.values.get('thing1'),
        'thing2': request.get_json().get('thing2')
    }
    print(params)
    return json.dumps(params) """

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