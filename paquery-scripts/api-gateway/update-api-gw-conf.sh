#!/bin/bash

if [ "$1" == "-h" ]; then
  echo "v1.0"
  echo "Actualiza config de api-gw con una nueva version de 'docker config'"
  echo "Uso:  update-api-gw-conf.sh <configAnterior> <nuevaConfig> [<nombreSerivioApiGW>]"
  echo ""
  echo "Ej: ./update-api-gw-conf.sh conf-api-gw-v1.0 conf-api-gw-v1.1 pq-api-gw"
  echo

  exit 0
fi;


previousConfig=$1
newConfig=$2

########################################################################
# Mapeo de argumentos

serviceName="${3:-pq-api-gw}"

docker_network="pq-ms-net"
inner_path_nginx_conf="/etc/nginx/nginx.conf"

########################################################################
# constantes

# ipCaronte=`docker inspect --format '{{ .NetworkSettings.IPAddress }}' caronteapp`

echo " actualizando servicio... "
docker service update --config-rm $previousConfig \
                      --config-add source=$newConfig,target=$inner_path_nginx_conf \
                      $serviceName
