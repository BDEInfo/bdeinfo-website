# syntax=docker/dockerfile:1

FROM node:22-slim

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN --mount=type=cache,target=/root/.npm \
	npm ci --no-audit --no-fund \
	--fetch-retries=5 \
	--fetch-retry-factor=2 \
	--fetch-retry-mintimeout=20000 \
	--fetch-retry-maxtimeout=120000

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]