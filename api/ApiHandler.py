from flask_restful import Api, Resource, reqparse
from flask import Flask, request
import logging
import whisper

log = logging.getLogger(__name__)


class HelloApiHandler(Resource):
    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "Puzzle: Use-case of Machine Learning on Video Processing"
        }

    def post(self):
        print(self)
        parser = reqparse.RequestParser()
        parser.add_argument('type', type=str)
        parser.add_argument('message', type=str)

        args = parser.parse_args()

        print(args)
        # note, the post req from frontend needs to match the strings here (e.g. 'type and 'message')

        request_type = args['type']
        request_json = args['message']
        # ret_status, ret_msg = ReturnData(request_type, request_json)
        # currently just returning the req straight
        ret_status = request_type
        ret_msg = request_json

        if ret_msg:
            message = "Your Message Requested: {}".format(ret_msg)
        else:
            message = "No Msg"

        final_ret = {"status": "Success", "message": message}

        return final_ret


class testApiConnection(Resource):
    def get(self):
        log.info("Hey inside test function")
        return {
            'resultStatus': 'SUCCESS',
            'message': "test successful"
        }


class VideoUrls(Resource):
    def get(self):
        args = request.args

        # online video urls
        yt_urls = ["https://www.youtube.com/watch?v=88kd9tVwkH8", "https://www.youtube.com/watch?v=2Qsn7QHS1XU",
                "https://www.youtube.com/watch?v=TzmtH_cOIb0", "https://www.youtube.com/watch?v=vchifPjqzZ4"]

        # local video urls
        local_urls = [['Marcin__Moonlight_Sonata_on_One_Guitar_Official_Video.mp4']]
        if args.get("type") == 'local':
            return {
                'resultStatus': 'SUCCESS',
                'url': local_urls
            }
        else:
            return {
                'resultStatus': 'SUCCESS',
                'url': yt_urls
            }


class AudioTranscriber(Resource):
    def post(self):
        log.info("Recieved a request to transcribe")
        parser = reqparse.RequestParser()
        parser.add_argument('path', type=str)
        # parser.add_argument('message', type=str)

        args = parser.parse_args()
        audio_file = args['path']
        log.info(f"Wav file path{audio_file}")

        model = whisper.load_model("base")
        result = model.transcribe(audio_file)

        import time
        time.sleep(1)
        return result["text"]
