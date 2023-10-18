FROM node:16-alpine

WORKDIR /usr/src/app

RUN yarn set version berry


COPY *.* ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "yarn workspace @monorepo/jurumarble dev"]