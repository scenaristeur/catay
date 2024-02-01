#!/usr/bin/env  bash
source .env

CURRENT=`pwd`
echo "$CURRENT"
BASENAME=`basename "$CURRENT"`

echo "$BASENAME"

echo -e "we will start 3 parts"

echo -e "\n      ------"
echo -e "ENVIRONMENT : \n"
echo -e "YJS_ENV:\t $YJS_ENV"


if [[ ${YJS_ENV} == "local" ]]
then
    echo -e "YJS_LOCAL_ENV:\t ${YJS_LOCAL_ENV}"
else
    echo -e "YJS_REMOTE_ENV:\t ${YJS_REMOTE_ENV}"
fi

echo -e "LLM_MODEL_NAME_ENV:\t ${MODEL_NAME_ENV}\n" 
echo "      ------"

read -p "Is this config 'OK'? type 'y' or 'o' , if not change .env file : " config_ok


tuerie() {
    kill -9 $prog1 $prog1 $prog3
}


if [[ $config_ok == [yYoO] ]]
then
    echo "You are OK with config, let's go!"
    if [[ ${YJS_ENV} == "local" ]]
    then
        echo -e "Launching npx y-websocket on PORT=1234"
        cd ~  && PORT=1234 npx y-websocket &
        prog1=$!
        echo -e "Launching llm server local ${YJS_LOCAL_ENV}"
        cd ${CURRENT}/server && node .  --yjs_url=${YJS_LOCAL_ENV} &
        prog2=$!
        echo -e "Launching front"   
    else
        echo "test"
        prog1=$!
        echo -e "Launching llm server remote ${YJS_REMOTE_ENV}"
        cd ${CURRENT}/server && node .  --yjs_url=${YJS_REMOTE_ENV}  &
        prog2=$!
    fi

    echo -e "Launching front-end"
    cd ${CURRENT}/vue-catay && npm run dev &
    prog3=$!


    trap 'tuerie' SIGINT 
fi

