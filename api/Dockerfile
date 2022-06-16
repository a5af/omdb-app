# Dockerfile
FROM node:18-alpine

RUN mkdir -p /usr/src/app
RUN mkdir -p /install

COPY package.json ./install/.
WORKDIR /install
RUN npm install --verbose
ENV NODE_PATH=/install/node_modules

WORKDIR /usr/src/app
RUN npm install nodemon -g

COPY . .

CMD [ "nodemon", "--inspect", "server.js" ]