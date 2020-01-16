#!/bin/bash

if [ "$1" == "-h" ]; then
  echo "v1.0"
  echo "correr un servicio nuevo customizado dentro del Swarm"
  echo "Uso:  run-ms.sh <Parametros propios de DockerSwarm ...>"
  echo ""
  echo "Ej: ./run-custom-ms.sh --name vtex "
  echo

  exit 0
fi;

msName="$1"
msImage="$2"
opts="$3"
otherArgs=$4
msReplicas=1

echo "iniciando servicio custom..."
docker service create --replicas $msReplicas \
    --network pq-ms-net \
    --with-registry-auth \
    --update-delay 20s $@
