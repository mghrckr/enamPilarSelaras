FROM node:20 as BUILD_IMAGE
WORKDIR /app

COPY package.json .

# Install dependencies
RUN npm install

# Salin semua file proyek
COPY . .

# Build aplikasi
RUN npm run build

FROM node:20-alpine AS PRODUCTION_IMAGE

COPY --from=BUILD_IMAGE /app/dist/ /app/dist/
WORKDIR /app

EXPOSE 4137

COPY package.json .
COPY vite.config.js .

# Start Nginx
CMD ["npm", "run", "preview"]
