# create a file named Dockerfile
FROM node:argon
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install && npm install -g bcrypt
COPY . /app
EXPOSE 3000
CMD ["npm", "start"]