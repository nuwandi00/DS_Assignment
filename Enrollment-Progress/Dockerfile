FROM node:20

WORKDIR /Enrollment-Progress

COPY package.json .

RUN npm install

EXPOSE 8001

COPY . .

CMD ["npm", "start"]