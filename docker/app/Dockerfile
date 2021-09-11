FROM node:16-buster-slim

RUN apt-get update && apt-get install -y --no-install-recommends git
#  error: server certificate verification failed. CAfile: none CRLfile: none
RUN apt-get install -y apt-transport-https ca-certificates gnupg
ENV APP_HOME /app
WORKDIR $APP_HOME

COPY . .

ENTRYPOINT ["tail","-f","/dev/null"]