
import logging
import re
import os
from pytube import YouTube

log = logging.getLogger(__name__)

YTURLS = [
        "https://www.youtube.com/watch?v=6gQ7m0c4ReI",  # Video1
        "https://www.youtube.com/watch?v=is68rlOzEio",  # Video2
        "https://www.youtube.com/watch?v=5sHwuARMXj0",  # Video3
        "https://www.youtube.com/watch?v=zcyatK8qc7c",  # Video4
        "https://www.youtube.com/watch?v=3dOATkCOguI",  # Video5
        "https://www.youtube.com/watch?v=2m9fqUQgzUA",  # Video6
        "https://www.youtube.com/watch?v=mQpzKwSxiOw",  # Video7
        "https://www.youtube.com/watch?v=NqSKXimnl6Y",  # Video8
        "https://www.youtube.com/watch?v=P3LjmYl4Yd8",  # Video9
        "https://www.youtube.com/watch?v=R3SOHWhJ398",
        "https://www.youtube.com/watch?v=MCO2-ikxe1I",
        "https://www.youtube.com/watch?v=rsJgPnWDflU",  # Video10
        "https://www.youtube.com/watch?v=AHlG_PwwvGY",  # Video11
        "https://www.youtube.com/watch?v=BIPTE84l9ls",  # Video12
        "https://www.youtube.com/watch?v=iveZwfEhZYI",  # Video13
        "https://www.youtube.com/watch?v=Oipg71dSem0",  # Video14
        "https://www.youtube.com/watch?v=-PWiegZQfAY",  # Video15
        "https://www.youtube.com/watch?v=1Asc6IaPunU",  # Video16
        "https://www.youtube.com/watch?v=l0JKkmztuRE",  # Video17
        "https://www.youtube.com/watch?v=pxoW-00Zyho",  # Video18
        "https://www.youtube.com/watch?v=W37hiyMDJnE",  # Video19
        "https://www.youtube.com/watch?v=WRe2sz5l9JE",  # Video20
    ]

def generate_metadata(yt_url):
    # Check if the youtube url has been preprocessed
    with open("data/preprocessed_urls.txt") as my_file:
        yt_urls = [line.rstrip("\n") for line in my_file]

        if yt_url in yt_urls:
            log.info(f"{yt_url} is already processed.")
            return
    video_object = YouTube(yt_url)
    # print(f"{video_object.title}")
    video_title = re.sub(r"[^A-Za-z0-9 ]+", "", video_object.title)
    video_title = video_title.replace(" ", "_")
    video_path = os.path.join(os.getcwd(), "frontend/build/avplayerlocal/videos")
    video_filename = video_title + ".mp4"
    video_thumbnail = video_object.thumbnail_url

    # video_thumbnail = os.path.join(os.getcwd(), "frontend/build/", )
    try:
        print(f"{video_path}")
        print(f"{video_filename}")
        saved_video = (
            video_object.streams.filter(mime_type="video/mp4", res="720p")
            .first()
            .download(filename=video_filename, output_path=video_path)
        )
        with open("data/preprocessed_urls.txt", "a", encoding="utf-8") as my_file:
            my_file.write(yt_url + "\n")
        with open("data/downloaded_video.txt", "a", encoding="utf-8") as my_file:
            my_file.write(f"{video_filename}" + "," + f"{video_path}" + "," + f"{video_thumbnail}" + "\n")
    except Exception as exc:
        log.exception(f"Failed to download {video_filename}")




if __name__ == "__main__":
    for yt_url in YTURLS:
        generate_metadata(yt_url)




