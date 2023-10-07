FROM node:18.16.1

WORKDIR /usr/src/bx-file-transfer-service/bx-file-transfer-service

COPY . .

RUN npm install -g yarn --force
RUN yarn

CMD ["yarn", "start:dev"]
