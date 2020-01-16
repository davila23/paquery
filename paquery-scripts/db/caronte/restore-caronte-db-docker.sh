#!/bin/bash

#caronte_pass="$1"
backup_path="$1"

db_container="carontedb"


docker cp "$backup_path"  $db_container:/backup.dump 

docker exec -it carontedb pg_restore --verbose \
									 --clean \
									 --exit-on-error \
									 --dbname=caronte \
									 --no-owner \
									 --if-exist \
									 -U caronte \
									 -h localhost \
									 -W /backup.dump