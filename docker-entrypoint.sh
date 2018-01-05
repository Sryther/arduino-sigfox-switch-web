#!/bin/bash

if [[ $BACKEND_URL -ne "" ]]
then
  sed -i -e "s/%backend_url%/$BACKEND_URL/g" ./src/environments/environment.prod.ts > ./src/environments/environment.prod.ts.tmp
  mv ./src/environments/environment.prod.ts.tmp ./src/environments/environment.prod
fi

if [[ $CALLBACKS_URL -ne "" ]]
then
  sed -i -e "s/%callbacks_url%/$CALLBACKS_URL/g" ./src/environments/environment.prod.ts > ./src/environments/environment.prod.ts.tmp
  mv ./src/environments/environment.prod.ts.tmp ./src/environments/environment.prod
fi

if [[ $TITLE -ne "" ]]
then
  sed -i -e "s/%title%/$TITLE/g" ./src/environments/environment.prod.ts > ./src/environments/environment.prod.ts.tmp
  mv ./src/environments/environment.prod.ts.tmp ./src/environments/environment.prod
fi

if [[ $PROD -eq "true" ]]
then
  exec ng serve --prod --host=0.0.0.0 --disable-host-check
else
  exec ng serve
fi
