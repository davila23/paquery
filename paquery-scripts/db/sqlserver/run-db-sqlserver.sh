#!/bin/bash

name_container="pq-sqlserver"
path_backup_container="/opt/backups"

docker run -d --name $name_container \
              -p 1433:1433 \
              -v "pq-sqlserver-backup-vol:$path_backup_container" \
              pq-db-sqlserver:1.0.0
