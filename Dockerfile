FROM node:12.13.0
COPY package*.json /usr/app/
WORKDIR /usr/app
RUN npm install --registry=https://registry.npm.taobao.org
COPY . /usr/app
EXPOSE 7001
CMD ["npm","start"]
