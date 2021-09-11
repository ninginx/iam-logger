FROM google/cloud-sdk:latest

RUN apt-get update && apt-get --only-upgrade install google-cloud-sdk-datastore-emulator

COPY docker/datastore/entrypoint.sh .

ENTRYPOINT ["./entrypoint.sh"]
# ENTRYPOINT ["tail","-f","/dev/null"]