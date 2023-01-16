# puzzle
This app has a flask backend and REact JS frontend

# HOW to run the flask application



# How to deploy the application on Perl host



sudo systemctl stop puzzle.service
sudo vim /etc/systemd/system/puzzle.service
sudo systemctl daemon-reload
sudo systemctl start puzzle.service

sudo vim /etc/nginx/sites-enabled/puzzle.nginx
sudo systemctl daemon-reload
sudo systemctl restart nginx


# List of issues
1. if we set the URL to local video. OnFocus starts playing the video. This does not happen if the type is set to online
2. Keypress handling - https://dev.to/alexkhismatulin/update-boolean-state-right-with-react-hooks-3k2i