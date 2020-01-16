#!/bin/bash

path_script_db="$1"
sql_database="${2:-master}"


echo "copiando script sql..."
docker cp "$path_script_db" pq-sqlserver:/opt/mssql-scripts/temp.sql


echo "ejecutando script sql..."
docker exec pq-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost \
        -U SA -P 'Paquery01' -d $sql_database \
        -i /opt/mssql-scripts/temp.sql

echo "reiniciando db..."
docker exec pq-sqlserver pkill sqlservr
docker restart pq-sqlserver

echo "eliminando archivos temporales"
docker exec pq-sqlserver rm /opt/mssql-scripts/temp.sql
