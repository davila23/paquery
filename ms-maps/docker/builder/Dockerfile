FROM openjdk:8u171-jre-alpine
ARG appname
ARG version
ARG versionType

VOLUME ["/tmp"]
MAINTAINER migue "miguel.torres@paquery.com"

#RUN apt update && apt upgrade -y

ADD ./build/libs/$appname-$version-$versionType.jar /app.jar
RUN sh -c 'touch /app.jar'

ENV JAVA_OPTS ""
#ENV JPAGENT_PATH="-agentpath:/usr/local/jprofiler8/bin/linux-x64/libjprofilerti.so=nowait"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar"]
#ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar", "-agentpath:/usr/local/jprofiler8/bin/linux-x64/libjprofilerti.so=port=8849"]