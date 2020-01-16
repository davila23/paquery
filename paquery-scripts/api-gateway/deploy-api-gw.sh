#!/bin/bash

version=${1:-preprod}
registry=${2:-us.icr.io/paquery}
image=${3:-paquery-api-gw}


docker tag $image:$version $registry/$image:$version
docker push $registry/$image:$version