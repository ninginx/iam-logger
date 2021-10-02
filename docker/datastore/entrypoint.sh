#!/bin/sh

gcloud config set project ${DATASTORE_PROJECT_ID}

gcloud beta emulators datastore start \
  --no-store-on-disk \
  --host-port=${DATASTORE_LISTEN_ADDRESS} \
  ${options}
