from flask_restful import Api, Resource, reqparse
from flask import Flask, request
import logging
import whisper

log = logging.getLogger(__name__)


# class HelloApiHandler(Resource):
#     def get(self):
#         return {
#             'resultStatus': 'SUCCESS',
#             'message': "Puzzle: Use-case of Machine Learning on Video Processing"
#         }

#     def post(self):
#         # print(self)
#         parser = reqparse.RequestParser()
#         parser.add_argument('type', type=str)
#         parser.add_argument('message', type=str)

#         args = parser.parse_args()

#         print(args)
#         # note, the post req from frontend needs to match the strings here (e.g. 'type and 'message')

#         request_type = args['type']
#         request_json = args['message']
#         # ret_status, ret_msg = ReturnData(request_type, request_json)
#         # currently just returning the req straight
#         ret_status = request_type
#         ret_msg = request_json

#         if ret_msg:
#             message = "Your Message Requested: {}".format(ret_msg)
#         else:
#             message = "No Msg"

#         final_ret = {"status": "Success", "message": message}

#         return final_ret


# class testApiConnection(Resource):
#     def get(self):
#         log.info("Hey inside test function")
#         return {
#             'resultStatus': 'SUCCESS',
#             'message': "test successful"
#         }


class VideoUrls(Resource):
    def get(self):
        args = request.args

        # online video urls
        yt_urls = [
                        "https://www.youtube.com/watch?v=6gQ7m0c4ReI",  # Video1
                        "https://www.youtube.com/watch?v=is68rlOzEio",  # Video2
                        "https://www.youtube.com/watch?v=5sHwuARMXj0",  # Video3
                        "https://www.youtube.com/watch?v=zcyatK8qc7c",  # Video4
                        "https://www.youtube.com/watch?v=3dOATkCOguI",  # Video5
                        "https://www.youtube.com/watch?v=2m9fqUQgzUA",  # Video6
                        "https://www.youtube.com/watch?v=mQpzKwSxiOw",  # Video7
                        "https://www.youtube.com/watch?v=NqSKXimnl6Y",  # Video8
                        "https://www.youtube.com/watch?v=P3LjmYl4Yd8",  # Video9
                        # "https://www.youtube.com/watch?v=R3SOHWhJ398",
                        # "https://www.youtube.com/watch?v=MCO2-ikxe1I",
                        "https://www.youtube.com/watch?v=rsJgPnWDflU",  # Video10
                        "https://www.youtube.com/watch?v=AHlG_PwwvGY",  # Video11
                        "https://www.youtube.com/watch?v=BIPTE84l9ls",  # Video12
                        "https://www.youtube.com/watch?v=iveZwfEhZYI",  # Video13
                        "https://www.youtube.com/watch?v=Oipg71dSem0",  # Video14
                        "https://www.youtube.com/watch?v=-PWiegZQfAY",  # Video15
                        "https://www.youtube.com/watch?v=1Asc6IaPunU",  # Video16
                        "https://www.youtube.com/watch?v=l0JKkmztuRE",  # Video17
                        "https://www.youtube.com/watch?v=pxoW-00Zyho",  # Video18
                        # "https://www.youtube.com/watch?v=W37hiyMDJnE",  # Video19
                        "https://www.youtube.com/watch?v=WRe2sz5l9JE"]

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

