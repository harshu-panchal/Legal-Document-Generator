from flask import Flask, request, jsonify, render_template
from flask_sse import sse
from datetime import time
import chatbot
import update_word_file



app = Flask(__name__)
app.config["REDIS_URL"] = "redis://localhost:6379"  
choice = ''
ch = ''


@app.route("/")
def hello():
    return render_template('index2.html')


@app.route("/chat", methods=["POST"])
def chat():
    global choice
    message = request.json.get("message")
    response = chatbot.runBoat(message)
    choice = response
    return jsonify({"response": response})


@app.route("/sendList")
def send():
    a = update_word_file.WordDocument()
    file_names = a.get_file_names()
    return jsonify(file_names)


@app.route("/search", methods=["POST"])
def search():
    global choice
    global ch
    number = request.json.get("number")
    a = update_word_file.WordDocument()
    if a.choice(choice[12:]) == 1:
        a.take_input_for_single_person(number)
        ch = a.modify_word_document()
    return jsonify({'doc':ch})


@app.route("/petition", methods=["POST"])
def petition():
    global choice
    number1And2 = request.get_json()
    number1 = number1And2['number1And2']['var1']
    number2 = number1And2['number1And2']['var2']
    a = update_word_file.WordDocument()
    a.choice(choice[12:])
    if a.choice(choice[12:]) == 2:
        print(number1,number2)
        a.take_input_for_two_person(number1,number2)
        a.modify_word_document()
    return "null"




if __name__ == '__main__':
    app.run(debug=True)
