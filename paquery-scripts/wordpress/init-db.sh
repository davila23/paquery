#!/bin/bash

source_config="${1:-config.sh}"
source ./${source_config}

#volume_db="${1:-${DB_VOLUME_DEFAULT}}"
volume_db="${DB_VOLUME_DEFAULT}"

docker run  -e MYSQL_ROOT_PASSWORD=$WP_DB_ROOT_PASS \
            -e MYSQL_USER=$WP_DB_USER \
            -e MYSQL_PASSWORD=$WP_DB_PASS \
            -e MYSQL_DATABASE=$WP_DB_NAME \
            -v $volume_db:/var/lib/mysql \
            --network $WP_NET_DOCKER \
            --name $DB_NAME_CONTAINER \
            -d mariadb
