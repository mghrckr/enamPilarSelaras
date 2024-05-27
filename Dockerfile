FROM node:20 as BUILD_IMAGE
WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@10.8.0

COPY . .

RUN npm run build

FROM node:20-alpine AS PRODUCTION_IMAGE

COPY --from=BUILD_IMAGE /app/dist/ /app/dist/
WORKDIR /app

EXPOSE 4137

COPY package.json .
COPY vite.config.js .

CMD ["npm", "run", "preview"]
