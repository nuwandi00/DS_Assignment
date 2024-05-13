FROM node:20

WORKDIR /Payment

COPY package.json .

RUN npm install

EXPOSE 8003

COPY . .

CMD ["npm", "start"]