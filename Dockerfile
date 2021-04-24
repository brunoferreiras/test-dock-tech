FROM node:12 as development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
USER node

FROM node:12-alpine3.11 as production
WORKDIR /app

ARG NODE_ENV=production

COPY package*.json ./

RUN npm install --only=production

COPY --chown=node:node --from=development /app/dist ./dist
COPY --chown=node:node ./tsconfig* ./

USER node

CMD [ "npm", "run", "start:prod" ]
