# Note: the docker files don't work quite just yet
FROM node:16-alpine as builder
WORKDIR /app
RUN apk add --no-cache git autoconf automake libtool make tiff jpeg \
                       zlib zlib-dev pkgconf nasm file gcc musl-dev g++ python3
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 8080
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html