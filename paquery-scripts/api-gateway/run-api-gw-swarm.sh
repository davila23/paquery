#!/bin/bash

if [ "$1" == "-h" ]; then
  echo "v1.0"
  echo "Corre Api gateway dentro de docker swarm para habilitar exposicion de servicios, con la configuracion por defecto"
  echo "Uso:  run-api-gw-swarm.sh <versionImagenDocker>"
  echo ""
  echo "Ej: ./run-api-gw-swarm.sh 1.0.0"
  echo

  exit 0
fi;


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

# ipCaronte=`docker inspect --format '{{ .NetworkSettings.IPAddress }}' caronteapp`

echo "creando servicio"
docker service create --name $container_name \
    --replicas 1 \
    --config source=conf-api-gw-v1,target="$inner_path_nginx_conf" \
    --secret source=paquery.com.key,target="${path_certs}/paquery.com.key" \
    --secret source=paquery.com.crt,target="${path_certs}/paquery.com.crt" \
    -p 80:80 -p 443:443 \
    --network $docker_network \
    --update-delay 10s \
		$api_gw_image
