import logging
import os
import time
import whisper

from flask import request
from flask_restful import Resource

log = logging.getLogger(__name__)


class Transcribe(Resource):
    """
    TODO
    - Update resultStatus
    - Update Frontend code to handle failure.
    """
    def post(self):
        files = request.files['file']
        filename = time.strftime("%Y%m%d_%H%M%S") + ".wav"
        file_location = os.path.abspath("./data/user_question/" + filename)
        files.save(file_location)
        log.info(f"Saved user information as {file_location}")
        text = "Not able to transcribe your question. Please try again"
        try:
            model = whisper.load_model("base")

            result = model.transcribe(file_location)
            text = str(result["text"])
        except Exception as exc:
            logging.exception(exc)

        return {
            'resultStatus': 'SUCCESS',
            'text': text
        }