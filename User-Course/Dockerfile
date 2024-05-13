FROM node:20

WORKDIR /User-Course

COPY package.json .

RUN npm install

EXPOSE 8002

COPY . .

CMD ["npm", "start"]