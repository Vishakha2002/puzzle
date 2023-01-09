from flask import Flask, request, jsonify, send_from_directory
from flask_restful import Api, Resource, reqparse
# from flask_cors import CORS #comment this on deployment
from api.ApiHandler import testApiConnection, AudioTranscriber, YoutubeUrls, HelloApiHandler
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
    return send_from_directory(app.static_folder, 'index.html')


@app.route("/api/receive_blob", methods=['post'])
def form():
    files = request.files['file']
    filename = time.strftime("%Y%m%d_%H%M%S") + ".wav"
    files.save(os.path.abspath(filename))
    model = whisper.load_model("base")
    result = model.transcribe(filename)

    # print(result["text"])
    # print(response)
    response = jsonify(result["text"])
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


api.add_resource(HelloApiHandler, '/api/hello')
api.add_resource(testApiConnection, '/api/test')
api.add_resource(AudioTranscriber, '/api/transcribe')
api.add_resource(YoutubeUrls, '/api/yturls')
