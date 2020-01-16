#!/bin/bash

if [ "$1" == "-h" ]; then
  echo "v1.0"
  echo "correr un servicio nuevo dentro del Swarm"
  echo "Uso:  run-ms.sh <nombreServicio> <imagenDocker>"
  echo ""
  echo "Ej: ./run-ms.sh caronte-api us.icr.io/paquery/caronte:1.0.0"
  echo

  exit 0
fi;

msName="$1"
msImage="$2"
opts="$3"
otherArgs=$4
msReplicas=1

echo  "pull de imagen de $msName..."
docker pull $msImage

if [ "$?" != "0" ]; then
    echo "ERROR en docker pull"
    exit 1
fi

echo "iniciando servicio $msName..."
docker service create --replicas $msReplicas \
    --name $msName \
    -e JAVA_OPTS="$opts" $otherArgs \
    --network pq-ms-net \
    --with-registry-auth \
    --update-delay 20s \
    $msImage
