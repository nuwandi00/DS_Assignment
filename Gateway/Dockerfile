FROM node:20

WORKDIR /Gateway

COPY package.json .

RUN npm install

EXPOSE 8000

COPY . .

CMD ["npm", "start"]