FROM node:16-buster-slim

RUN apt-get update && apt-get install -y --no-install-recommends git

ENV APP_HOME /app
WORKDIR $APP_HOME

COPY . .

ENTRYPOINT ["tail","-f","/dev/null"]