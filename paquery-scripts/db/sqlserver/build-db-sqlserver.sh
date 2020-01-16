#!/bin/bash

echo "buildeando imagen de pq-db-sqlserver"

docker build -t pq-db-sqlserver:1.0.0 -f Dockerfile . 