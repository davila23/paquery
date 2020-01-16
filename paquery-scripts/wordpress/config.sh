#!/bin/bash

export WP_DB_ROOT_PASS="paquery2017"
export WP_DB_NAME="pquser"
export WP_DB_USER="pquser2019"
export WP_DB_PASS="pquser2019!01"

export WP_NET_DOCKER="pq-wordpress-net"

export DB_VOLUME_DEFAULT="/root/wordpress/database"
export DB_NAME_CONTAINER="pq-wordpress-db"

export WP_VOLUME_DEFAULT="/root/wordpress/html"
export WP_NAME_CONTAINER="pq-wordpress"
export WP_PORT="81"
