FROM node:alpine as builder
WORKDIR /app
RUN apk add --no-cache git autoconf automake libtool make tiff jpeg \
                       zlib zlib-dev pkgconf nasm file gcc musl-dev
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 8080
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html