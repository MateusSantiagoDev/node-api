FROM node:18
WORKDIR /app/node-api
COPY package*.json .
RUN npm install --only=prod

