FROM node:18

WORKDIR /app

RUN yarn set version berry

COPY *.* ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "yarn workspace @monorepo/jurumarble dev"]
