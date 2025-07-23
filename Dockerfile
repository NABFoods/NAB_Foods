FROM node:24-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build
EXPOSE 3000

ENTRYPOINT [ "ts-node", ".src/server/server.ts" ]