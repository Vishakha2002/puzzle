from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
# from flask_cors import CORS #comment this on deployment
from api.ApiHandler import testApiConnection
from api.ApiHandler import HelloApiHandler

import logging
logging.basicConfig(filename='flask_app.log', level=logging.DEBUG, format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')


app = Flask(__name__, static_url_path='', static_folder='frontend/build')
# CORS(app) #comment this on deployment
api = Api(app)


@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')


api.add_resource(HelloApiHandler, '/api/hello')
api.add_resource(testApiConnection, '/api/test')
