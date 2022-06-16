# Dockerfile
FROM node:18-alpine

RUN mkdir /app
RUN mkdir -p /install

COPY package.json ./install/.
WORKDIR /install
RUN npm install --verbose

ENV NODE_PATH=/install/node_modules
ENV PATH=/install/node_modules/.bin:$PATH

WORKDIR /app

COPY . .
CMD ["npm", "start"]