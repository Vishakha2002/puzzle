from flask import Flask, request, jsonify, send_from_directory
from flask_restful import Api, Resource, reqparse
# from flask_cors import CORS #comment this on deployment
from api.ApiHandler import testApiConnection, AudioTranscriber, YoutubeUrls, HelloApiHandler
# from api.whisper_transcription import
import os

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
    files.save(os.path.abspath(f'test_1.wav'))

    response = jsonify("File received and saved!")
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


api.add_resource(HelloApiHandler, '/api/hello')
api.add_resource(testApiConnection, '/api/test')
api.add_resource(AudioTranscriber, '/api/transcribe')
api.add_resource(YoutubeUrls, '/api/yturls')
