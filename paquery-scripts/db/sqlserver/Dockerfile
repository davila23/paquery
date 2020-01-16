FROM mcr.microsoft.com/mssql/server:2017-latest

# create directory within SQL container for database files
RUN mkdir -p /opt/mssql-scripts

# copy the database files from host to container
COPY init-db.sql /opt/mssql-scripts

# seteo variables de entorno
ENV MSSQL_SA_PASSWORD=Paquery01
ENV ACCEPT_EULA=Y

# corro el script para que inicialize la base
RUN ( /opt/mssql/bin/sqlservr --accept-eula & ) | grep -q "Service Broker manager has started" \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P 'Paquery01' -i /opt/mssql-scripts/init-db.sql \
    && pkill sqlservr 