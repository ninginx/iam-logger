FROM node:16-buster-slim

RUN apt-get update && apt-get install -y --no-install-recommends git procps
#  error: server certificate verification failed. CAfile: none CRLfile: none
RUN apt-get install -y apt-transport-https ca-certificates gnupg software-properties-common curl
RUN curl -fsSL https://apt.releases.hashicorp.com/gpg | apt-key add -
RUN apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
RUN curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
RUN apt-get update && apt-get install -y terraform google-cloud-sdk
ENV APP_HOME /app
WORKDIR $APP_HOME

COPY . .

ENTRYPOINT ["tail","-f","/dev/null"]