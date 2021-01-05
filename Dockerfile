FROM node

WORKDIR /usr/src/app

COPY server .

RUN npm install

EXPOSE 3000
CMD ["node", "server.js"]