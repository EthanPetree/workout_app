FROM node:18-alpine AS dev

WORKDIR /workspace/server

# This step will be cached and won't have to run unless the dependencies change for the project
COPY package.json package-lock.json ./
RUN npm install

# trailing / makes no real difference
COPY . .

FROM dev AS pruner

WORKDIR /workspace/server

RUN npm prune --production

FROM node:18-alpine AS runner

WORKDIR /workspace/server

COPY --from=pruner /workspace/server /workspace/server

EXPOSE 3000

CMD ["npm", "start"]