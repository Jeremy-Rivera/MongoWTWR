# WTWR (What to Wear?) 
# Instance @ http://100.26.146.230/ currently is down because of Free Tier usage. Can restart upon request (6/20/24))

Simple weather app created with React to help users decide what to wear based on the current weather.


## Description

Optimized for MongoDB Presentation. The app fetchs data from [Open Weather Map's API](https://openweathermap.org/api) according to a set latitude and longitude. This data then dynamicaly styles the app's appearance and filters uploaded clothing based on the weather.

### Built With

[![React][react]][react-url]
[![React Router][react-r]][react-r-url]
[![Jest][jest]][jest-url]
[![JavaScript][js]][js-url]
[![Node][nodejs]][nodejs-url]
[![Express][express]][express-url]
[![Mongo][MongoDB]][Mongo-url]
[![JSON][JSONwt]][JSONwt-url]


[react]: https://img.shields.io/badge/react-000000?style=for-the-badge&logo=react&logoColor=#61dbfb
[react-url]: https://reactjs.org/
[react-r]: https://img.shields.io/badge/reactrouter-000000?style=for-the-badge&logo=reactrouter&logoColor=#CA4245
[react-r-url]: https://reactrouter.com/en/main
[jest]: https://img.shields.io/badge/jest-C21325?style=for-the-badge&logo=jest
[jest-url]: https://jestjs.io/
[MongoDB]: https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[Mongo-url]: https://www.mongodb.com/
[express]: https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white
[express-url]: https://expressjs.com/
[nodejs]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=black
[nodejs-url]: https://nodejs.org/en/
[js]: https://img.shields.io/badge/javascript-000000?style=for-the-badge&logo=javascript&logoColor=#F7DF1E
[js-url]: https://www.javascript.com/
[JSONwt]: https://img.shields.io/badge/jsonwebtokens-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=#F7DF1E
[JSONwt-url]: https://www.npmjs.com/package/jsonwebtoken


# Hosting on AWS EC2 (UBUNTU)

## Setup EC2 Instance
sudo apt update
sudo apt upgrade

## Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

## rsync
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.env' \
-e "ssh -i ~/.ssh/your-key.pem" \
. ubuntu@ip-address:~/app

## Setup MongoDB
sudo apt-get install gnupg curl

curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

sudo apt-get update
sudo apt-get install -y mongodb-org

echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-database hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-mongosh hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections

sudo vim /etc/systemd/system/myapp.service

## Define the service settings. Add the following content in Vim, modifying as needed for your application:
### [Unit]
Description=Node.js App
After=network.target multi-user.target

### [Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/app
ExecStart=/usr/bin/npm start
Restart=always
Environment=NODE_ENV=production
EnvironmentFile=/etc/app.env
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=myapp

### [Install]
WantedBy=multi-user.target

## Reload systemd and start your service.
sudo systemctl daemon-reload
sudo systemctl enable myapp.service
sudo systemctl start myapp.service

## Verify that the service is running properly.
sudo systemctl status myapp.service

# Caddy
## Step 1: Install Caddy
https://caddyserver.com/docs/install

sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy

## Update the Caddyfile
sudo vim /etc/caddy/Caddyfile
 :80 {
     reverse_proxy localhost:3000
 }

sudo systemctl restart caddy

## Step 2: Configure Caddy to Use HTTPS
### Add a domain name for your server.

## Update the Caddyfile to use your domain name and enable HTTPS.
sudo vim /etc/caddy/Caddyfile
 mydomain.com {
     reverse_proxy localhost:3000
 }

sudo systemctl restart caddy


###  Taken with the help from : https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/ & https://www.sammeechward.com/deploying-full-stack-js-to-aws-ec2#database


