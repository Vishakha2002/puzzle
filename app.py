from flask import Flask, request, jsonify, send_from_directory
from flask_restful import Api, Resource, reqparse
# from flask_cors import CORS #comment this on deployment
from api.ApiHandler import testApiConnection, AudioTranscriber, VideoUrls, HelloApiHandler
# from api.whisper_transcription import
import os
import whisper
import time

import logging
logging.basicConfig(filename='flask_app.log', level=logging.DEBUG,
                    format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')


app = Flask(__name__, static_url_path='', static_folder='frontend/build')
# CORS(app) #comment this on deployment
api = Api(app)


@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory('frontend/build', 'index.html')


@app.route("/api/receive_blob", methods=['post'])
def form():
    files = request.files['file']
    filename = time.strftime("%Y%m%d_%H%M%S") + ".wav"
    files.save(os.path.abspath(filename))

    # model = whisper.load_model("base")

    # print(model)

    # result = model.transcribe(filename)

    # print(result)
    # # print(result["text"])
    # # print(response)
    # response = jsonify(result["text"])
    # response.headers.add('Access-Control-Allow-Origin', '*')

    return {
        'resultStatus': 'SUCCESS',
        'text': "We have got your question!"
    }


@app.route("/api/trascribe_question", methods=['get'])
def trascribe():

    return {
        'resultStatus': 'SUCCESS',
        'text': "Here is the answer to your Question"
    }


api.add_resource(HelloApiHandler, '/api/hello')
api.add_resource(testApiConnection, '/api/test')
api.add_resource(AudioTranscriber, '/api/transcribe')
api.add_resource(VideoUrls, '/api/yturls')