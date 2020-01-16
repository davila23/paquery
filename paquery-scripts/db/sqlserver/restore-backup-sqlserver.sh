#!/bin/bash

########################################################################################
#### Mapeo de Argumentos
path_backup="$1"


########################################################################################
#### Seteo de constantes
path_backup_container="/opt/backups"
sql_container="pq-sqlserver"
sql_container_pass="Paquery01"
name_restored_db="paqueryRestoredDB"


echo "copiando backup a container ..."
docker exec -it $sql_container mkdir -p "$path_backup_container"
docker cp "$path_backup" "$sql_container:$path_backup_container/db.bak"


name_catalog=$(docker exec -it $sql_container \
    /opt/mssql-tools/bin/sqlcmd -S localhost \
    -U SA -P $sql_container_pass \
    -Q "RESTORE FILELISTONLY FROM DISK = \"$path_backup_container/db.bak\"" \
    | tr -s ' ' | cut -d ' ' -f 1-2 | tail -n4 | head -n1 | cut -f 1 -d " ")


echo "Restaurando $name_catalog a $name_restored_db ..."
docker exec -it $sql_container      \
    /opt/mssql-tools/bin/sqlcmd     \
    -S localhost -U SA -P Paquery01 \
    -Q "RESTORE DATABASE $name_restored_db FROM DISK = \"$path_backup_container/db.bak\" WITH MOVE \"${name_catalog}\" TO \"/var/opt/mssql/data/${name_catalog}.ndf\", MOVE \"${name_catalog}_log\" TO \"/var/opt/mssql/data/${name_catalog}_log.ldf\""


echo "Borrando archivos temporales..."
docker exec -it $sql_container rm $path_backup_container/db.bak
