FROM node:22 as BUILD_IMAGE
WORKDIR /app

COPY package*.json /app/
COPY vite.config.js /app/

RUN npm install

COPY . /app/

RUN npm run build

FROM node:22-alpine AS PRODUCTION_IMAGE

COPY --from=BUILD_IMAGE /app/dist/ /app/dist/
WORKDIR /app

EXPOSE 4173

COPY package.json .
COPY vite.config.js .

RUN npm install vite@4.2.0

CMD ["npm", "run", "preview"]
