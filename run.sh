#!/usr/bin/env  bash
source .env

echo -e "we will start 3 parts"

echo -e "\n      ------"
echo -e "ENVIRONMENT : \n"
echo -e "YJS_ENV:\t $YJS_ENV"

if [[ ${YJS_ENV} == "local" ]]
then
    echo -e "YJS_LOCAL:\t ${YJS_LOCAL_ENV}"
else
    echo -e "YJS_REMOTE:\t ${YJS_REMOTE_ENV}"
fi
echo "      ------"

read -p "Is this config 'OK'? type 'y' or 'o' , if not change .env file : " config_ok


if [[ $config_ok == [yYoO] ]]
then
    echo "You are OK with config, let's go!"
    # echo -e "Launching npx y-websocket on PORT=1234"
    # cd ~  && PORT=1234 npx y-websocket &
    # pwd
fi

