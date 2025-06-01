import random
import json
import pickle
import numpy as np
import nltk

import wikipediaapi

from nltk.stem import WordNetLemmatizer
from keras.models import load_model

import update_word_file


wiki = wikipediaapi.Wikipedia('MyChatBot', 'en')

lemmatizer = WordNetLemmatizer()
intents = json.loads(open('intents.json').read())

words = pickle.load(open('words.pkl', 'rb'))
classes = pickle.load(open('classes.pkl', 'rb'))
model = load_model('chatbot_model.h5')\



def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word) for word in sentence_words]
    return sentence_words


def bag_of_words(sentence):
    sentence_words = clean_up_sentence(sentence.lower())
    bag = [0] * len(words)
    for w in sentence_words:
        for j, word in enumerate(words):
            if word == w:
                bag[j] = 1
    return np.array(bag)


def predict_class(sentence):
    bow = bag_of_words(sentence)
    res = model.predict(np.array([bow]))[0]
    ERROR_THRESHOLD = 0.9
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]

    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({'intent': classes[r[0]], 'probability': str(r[1])})
    print(return_list)
    return return_list


def get_response(message_,intents_list, intents_json):
    result = ''
    try:
        tag = intents_list[0]['intent']
        list_of_intents = intents_json['intents']
        for i in list_of_intents:
            if i['tag'] == tag:
                result = random.choice(i['responses'])
                break
        return result
    except:
        page_ = wiki.page(message_)
        if page_.exists():
            print("")
            result = "Bot : "+ page_.summary
            return result
        else:
            result = "Bot : Sorry I didn't understand!1"
            return result

def runBoat(query):

    print("GO! Bot is running!")

    while True:
        message = query

        if message == "":
            response = "Bot : say something!"
        else:
            try:
                response = "Bot : " + str(eval(query))
                print(response)
                return response
            except: 
                ints = predict_class(query)
                response = get_response(query, ints, intents)                

                if response == 'wikipedia':
                    search = message.split()
                    for i in range(len(search)):
                        search[i] = search[i].capitalize()
                    b = ''
                    for q in search:
                        b = b + q + ' '
                    page = wiki.page(b)
                    if page.exists():
                        response = "Bot : " +  page.summary
                        return response
                    else:
                        response = "Bot : Sorry I didn't understand!2"
                        return response

                elif response == "Bus Undertaking":
                    response = "To create a bus undertaking"
                    return response
                    
                elif response == "family court":
                    response = "To create a family court petition"
                    return response
                
                elif response == "Partnership deed":
                    response = "To create a PARTNERSHIP DEED"
                    return response

                # elif response == "rent agreement":
                #     print("To create a rent paper agreement please fill the required details carefully :")
                #     a = update_word_file.WordDocument()
                #     a.choice('rent agreement')
                #     a.take_input()
                #     a.modify_word_document()

                else:
                    return response

# runBoat("hii")
