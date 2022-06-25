FROM node:16.15.1 

WORKDIR /server

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5001

CMD ["npm", "start"]

