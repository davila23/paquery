#!/bin/bash

version="${1:-1.0.1}"
registry="us.icr.io/paquery"

echo "builendo api-gw version: $version"

docker build -t $registry/paquery-api-gw:$version -f Dockerfile .
