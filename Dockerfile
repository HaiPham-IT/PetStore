FROM node:12.7.0-alpine

WORKDIR /app

COPY server /app

RUN ls

RUN npm install

EXPOSE 3000
CMD ["node", "server.js"]