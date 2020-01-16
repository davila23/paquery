#!/bin/bash

source_config="${1:-config.sh}"
source ./${source_config}

#wp_volume="${1:-${WP_VOLUME_DEFAULT}}"
wp_volume="$WP_VOLUME_DEFAULT"

docker run -e WORDPRESS_DB_USER=$WP_DB_USER \
           -e WORDPRESS_DB_PASSWORD=$WP_DB_PASS \
           -e WORDPRESS_DB_NAME=$WP_DB_NAME \
           -e WORDPRESS_DB_HOST=$DB_NAME_CONTAINER \
           -p $WP_PORT:80 \
           -v $wp_volume:/var/www/html \
           --network $WP_NET_DOCKER \
           --name $WP_NAME_CONTAINER \
           -d wordpress:latest
