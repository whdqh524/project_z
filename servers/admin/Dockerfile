FROM node:18 As build
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /usr/src/app

COPY --chown=node:node pnpm-lock.yaml ./

RUN pnpm fetch --prod

COPY --chown=node:node . .
RUN yes | pnpm install

RUN npx prisma generate --schema=./common/database/RDBMS/web/schema.prisma
RUN npx prisma generate --schema=./common/database/RDBMS/game/schema.prisma

RUN pnpm -F ./common build

RUN pnpm -F ./servers/admin build

COPY .env.dev ./servers/admin/dist

RUN find common -mindepth 1 ! -path 'common/dist*' ! -path 'common/node_modules*' -delete

RUN mv common/dist/* common/

RUN rm -r common/dist

RUN pnpm -F admin deploy --prod ./pruned


###################
# PRODUCTION
###################

FROM node:18-alpine As production

COPY --chown=node:node --from=build /usr/src/app/pruned/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/servers/admin/dist ./dist

WORKDIR /dist

CMD [ "node", "main.js" ]