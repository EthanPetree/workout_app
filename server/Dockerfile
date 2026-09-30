FROM node:18-alpine

WORKDIR /workspace/server

# This step will be cached and won't have to run unless the dependencies change for the project
COPY ./server/package.json ./server/package-lock.json ./
RUN npm install

# research what the training / does
COPY ./server/ .

EXPOSE 3000

CMD ["npm", "start"]