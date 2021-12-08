# include node.js in container
FROM node:latest
# create directory in container where will be bot
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
# install dependencies
RUN npm install 
# copy all files in container
COPY . /usr/src/app/
# start bot in container
CMD ["npm", "run", "dev"]
