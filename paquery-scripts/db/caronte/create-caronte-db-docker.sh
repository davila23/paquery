#!/bin/bash

# Script de creacion de BDD PostgreSQL para Caronte

path_db="${1:-/var/db/caronte}"

db_pass="P@Qu3R1"
db_user="caronte"
db_name="caronte"


db_inner_path_db="/var/lib/postgresql/data"

db_name_image="postgres"
db_image_version="10.7"


db_container_name="carontedb"


if [ ! -d "$path_db" ]; then
	echo "creo path para db en '$path_db'"
	mkdir -p "$path_db"
fi

docker run -d  -v $path_db:$db_inner_path_db  \
				-e POSTGRES_DB=$db_name    \
				-e POSTGRES_USER=$db_user  \
				-e POSTGRES_PASSWORD=$db_pass  \
				--name $db_container_name \
				-p 5432:5432 \
				$db_name_image:$db_image_version
				

# comando para restaurar base
#pg_restore --verbose --clean --exit-on-error --dbname=caronte --no-owner --if-exist -U caronte -h localhost -W backup-caronte-postgres.dump