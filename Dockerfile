FROM node:8
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000
RUN npm run build
ENV NODE_ENV production
CMD ["npm", "start"]