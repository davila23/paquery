#!/usr/bin/env bash

version="${1:-latest}"
profile="${2:-default}"
registry="${3:-us.icr.io/paquery}"

container_name="mapapp"


spring_profile="-Dspring.profiles.active=${profile}"
spring_datasource="-Dhibernate.hbm2ddlAuto=update -Dspring.datasource.url=jdbc:postgresql://carontedb:5432/caronte -Dspring.datasource.username=caronte -Dspring.datasource.password=P@Qu3R1"

#ipCaronteDb=`docker inspect --format '{{ .NetworkSettings.IPAddress }}' carontedb`

existDockerRunning=`docker ps -a | grep ${container_name}`

if [ "$existDockerRunning" ]; then
    echo "parando instancia anterior de docker"
    docker stop $container_name && docker rm $container_name
fi

docker run -d -p 8090:8080 --name $container_name \
        -e JAVA_OPTS="$spring_profile $spring_datasource" \
        #--add-host carontedb:$ipCaronteDb \
        $registry/caronte:$version
