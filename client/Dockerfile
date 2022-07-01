FROM node:16.15.1 as build
WORKDIR /client
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.23.0
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /client/build /usr/share/nginx/html