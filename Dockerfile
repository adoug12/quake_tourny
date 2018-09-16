FROM node:8
RUN mkdir -p client
COPY package.json .
COPY client/package.json ./client
RUN npm install
RUN npm run client-install
COPY . .
EXPOSE 5000
RUN npm run build
ENV NODE_ENV production
CMD ["npm", "start"]