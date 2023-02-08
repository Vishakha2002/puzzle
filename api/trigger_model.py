import logging
import time

from flask import request
from flask_restful import Resource

log = logging.getLogger(__name__)


class TriggerModel(Resource):
    def post(self):
        log.info(f"Got question: {request.data}")
        time.sleep(5)
        return {
            'resultStatus': 'SUCCESS',
            'answer' : 'This is a mock response'
        }