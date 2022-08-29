#!/bin/bash
# Basic env vars. Would be nice to refine this later on.

export DOMAIN_EN="en.learning-resources:8080"
export DOMAIN_FR="fr.learning-resources:8080"
export CTF_CDA_ACCESS_TOKEN=$contentful_access_token
export contentful_space_id="zy72kv0qwyyq"
export CTF_SPACE_ID=$contentful_space_id
export GOOGLE_ANALYTICS_ID="X-AE-A-X12"
export GOOGLE_TAG_MANAGER_ID="GTM-X-AE-A-X12"

FILE=".contentful.json"
FILE_TO_COPY=".contentful.json.sample"
if [ ! -d "app" ]; then
  if [ -d "../app" ]; then
    DIR="../app/"
  fi
else
  DIR="app/"
fi

FILE=$DIR$FILE
FILE_TO_COPY=$DIR$FILE_TO_COPY
if test -f "$FILE"; then
    echo "$FILE already exists. Hooray 🎉"
else
    echo "Copied $FILE_TO_COPY to $FILE"

    cp $FILE_TO_COPY $FILE
fi
