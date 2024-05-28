FROM node:22 as BUILD_IMAGE
WORKDIR /app

COPY package*.json /app/
COPY vite.config.js /app/

RUN npm install -g npm@latest
RUN npm install 

RUN npm install -g vite

COPY . /app/

RUN npm run build

FROM node:22-alpine AS PRODUCTION_IMAGE

COPY --from=BUILD_IMAGE /app/dist/ /app/dist/
WORKDIR /app

EXPOSE 4137

COPY package.json .
COPY vite.config.js .

CMD ["npm", "run", "preview"]
