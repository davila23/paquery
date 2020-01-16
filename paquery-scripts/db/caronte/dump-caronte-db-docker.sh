#!/bin/bash

db_container="carontedb"

docker exec -it $db_container sh -c 'pg_dump -Fc caronte -U caronte > /db.dump'

docker cp $db_container:/db.dump ./db.dump
