FROM node:18-alpine

WORKDIR /server

COPY ./server/package.json ./server/package-lock.json ./
RUN npm install

COPY ./server .

EXPOSE 3000

CMD ["npm", "start"]