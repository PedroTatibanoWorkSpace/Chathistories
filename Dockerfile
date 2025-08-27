FROM node:22-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "if [ \"$APP_ENV\" = \"production\" ]; then yarn start; else yarn start:dev; fi"]
