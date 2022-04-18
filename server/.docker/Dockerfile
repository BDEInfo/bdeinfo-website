# syntax=docker/dockerfile:1

FROM node:14.19.0

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm i

COPY . .

RUN npm run build

CMD ["npm", "run", "develop"]
