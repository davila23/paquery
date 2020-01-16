#!/bin/bash

version=${1:-latest}
path_volume_conf=${2:-$(pwd)/nginx.conf}
path_certs=${3:-/etc/certs}

########################################################################
# Mapeo de argumentos
path_current_dir=$(pwd)

container_name="pq-api-gw"
registry=${2:-us.icr.io/paquery}
api_gw_image="$registry/paquery-api-gw:${version}"
#path_volume="/root/nginx.conf"
docker_network="pq-ms-net"

########################################################################
# constantes
inner_path_nginx_conf="/etc/nginx/nginx.conf"

existDockerRunning=`docker ps -a | grep ${container_name}`

if [ "$existDockerRunning" ]; then
    echo "parando instancia anterior..."
    docker stop $container_name && docker rm $container_name
fi


# ipCaronte=`docker inspect --format '{{ .NetworkSettings.IPAddress }}' caronteapp`


docker run -d --name $container_name -p 80:80 -p 443:443 \
    --network $docker_network \
    -v "${path_volume_conf}:${inner_path_nginx_conf}:ro" \
		-v "${path_certs}:/etc/certs" \
		$api_gw_image
