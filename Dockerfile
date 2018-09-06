FROM node:8
USER node
WORKDIR /home/node/app
COPY package.json .
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "run", "server"]