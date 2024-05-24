# Gunakan image Node.js untuk tahap build
FROM node:20 as build

# Set direktori kerja
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm cache clean --force
RUN npm install -g npm@latest
RUN npm install

# Salin semua file proyek
COPY . .

# Build aplikasi
RUN npm run build

# Gunakan image Nginx untuk tahap deploy
FROM nginx:alpine

# Salin build output dari tahap build ke direktori Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 81

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
