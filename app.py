from flask import Flask, request, jsonify, send_from_directory
from flask_restful import Api, Resource, reqparse
# from flask_cors import CORS #comment this on deployment
from api.ApiHandler import testApiConnection, AudioTranscriber, VideoUrls, HelloApiHandler
# from api.whisper_transcription import
import os
import whisper
import time
import json
import requests
import tarfile

import logging
logging.basicConfig(filename='flask_app.log', level=logging.DEBUG,
                    format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')


def download_required_files():
    if os.path.exists("vggish_model.ckpt"):
        logging.info("Found vggish_model.ckpt, no need to download it")
    else:
        URL = "https://storage.googleapis.com/audioset/vggish_model.ckpt"
        response = requests.get(URL)
        open("vggish_model.ckpt", "wb").write(response.content)
        logging.info("Downloaded vggish_model.ckpt")
    if os.path.exists("ffmpeg_dir/ffmpeg-git-20220910-i686-static/ffmpeg"):
        logging.info("ffmpeg is already downloaded")
    else:
        logging.info("Downloading ffmpeg")
        os.makedirs("ffmpeg_dir")

        URL = "https://johnvansickle.com/ffmpeg/builds/ffmpeg-git-i686-static.tar.xz"
        response = requests.get(URL)
        open("ffmpeg-git-i686-static.tar.xz", "wb").write(response.content)

        ffmpeg_file = tarfile.open('ffmpeg-git-i686-static.tar.xz')
        ffmpeg_file.extractall('./ffmpeg_dir')
        ffmpeg_file.close()
        logging.info("Setting ffmpeg file path")

    if "ffmpeg_dir" not in os.environ["PATH"]:
        os.environ["PATH"] += os.pathsep + os.path.join(os.getcwd(), "ffmpeg_dir/ffmpeg-git-20220910-i686-static/")


def setup_directory() -> None:
    """
    Before you begin setup data directories
    data/raw_audio                      : Path for extracted Audio from the youtube video
    data/raw_video                      : Path for downloaded Video from youtube
    data/frames/audio
    data/frames/video                   : Path for extracted frames from video
    data/features/audio_vggish          : Path for extracted VGGish features from audia waveform
    data/features/video_resnet18        : PAth for extracted Video features using resent features
    data/user_question                  : Path to store user question audio
    data/preprocessed_urls.txt          : Path to append preprocessed yt urls
    data/preprocessed_urls_metadata.txt : Path to add preprocessing metadata for a processed yt url
    logs                                : Path to save olaf logs

    """
    if not os.path.exists("data/raw_audio"):
        os.makedirs("data/raw_audio")
    if not os.path.exists("data/raw_video"):
        os.makedirs("data/raw_video")
    if not os.path.exists("data/user_question"):
        os.makedirs("data/user_question")

    if not os.path.exists("data/frames"):
        os.makedirs("data/frames")
    if not os.path.exists("data/frames/audio"):
        os.makedirs("data/frames/audio")
    if not os.path.exists("data/frames/video"):
        os.makedirs("data/frames/video")

    if not os.path.exists("data/features"):
        os.makedirs("data/features")
    if not os.path.exists("data/features/audio_vggish"):
        os.makedirs("data/features/audio_vggish")
    if not os.path.exists("data/features/video_resnet18"):
        os.makedirs("data/features/video_resnet18")
    if not os.path.exists("data/pretrained"):
        os.makedirs("data/pretrained")
    if not os.path.exists("data/preprocessed_urls.txt"):
        open("data/preprocessed_urls.txt", "a").close()
    if not os.path.exists("data/preprocessed_urls_metadata.txt"):
        with open("data/preprocessed_urls_metadata.txt", "w") as foo:
            tmp = {}
            json.dump(tmp, foo)
    if not os.path.exists("logs"):
        os.makedirs("logs")


def create_app() -> Flask:
    app = Flask(__name__, static_url_path='', static_folder='frontend/build')
    logging.info("Staring Puzzle")
    logging.info("Setting up directories for Puzzle")
    setup_directory()
    download_required_files()
    return app

app = create_app()
# CORS(app) #comment this on deployment
api = Api(app)


@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory('frontend/build', 'index.html')


@app.route("/api/transcribe_question", methods=['post'])
def transcribe_question():
    files = request.files['file']
    filename = time.strftime("%Y%m%d_%H%M%S") + ".wav"
    file_location = os.path.abspath("./data/user_question/" + filename)
    files.save(file_location)

    model = whisper.load_model("base")

    result = model.transcribe(file_location)
    text = str(result["text"])

    return {
        'resultStatus': 'SUCCESS',
        'text': text
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