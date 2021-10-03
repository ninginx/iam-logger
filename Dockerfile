FROM node:16-buster-slim AS build-stage

WORKDIR /app
COPY . ./
RUN yarn install && yarn build

FROM node:16-buster-slim as production-stage
WORKDIR /app
COPY --from=build-stage /app/package.json /app
COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/.env.example /app/.env

RUN yarn install --production
CMD ["npm","run", "start:prod"]