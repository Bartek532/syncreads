FROM node:16-slim AS deps
RUN apt-get update \
  && apt-get install -y openssl \
  && apt-get install -y procps
WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

FROM deps AS migrations
CMD ["npm", "run", "db:migrate:dev"]

FROM migrations AS starter
EXPOSE 3000
CMD ["npm", "run", "dev"]
