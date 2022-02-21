FROM ubuntu:20.04 as builder

RUN apt-get update
RUN apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
RUN apt-get install nodejs

WORKDIR /app

RUN npm install -g gatsby-cli
COPY ./package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx
COPY --from=builder /app/public /usr/share/nginx/html