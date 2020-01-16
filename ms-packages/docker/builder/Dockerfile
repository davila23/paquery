FROM us.icr.io/paquery/java:8

RUN apk --update add fontconfig ttf-dejavu

ARG appname
ARG version
ARG versionType

ADD ./build/libs/$appname-$version-$versionType.jar /app.jar
RUN sh -c 'touch /app.jar'

ENV JAVA_OPTS ""

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Duser.timezone=America/Argentina/Buenos_Aires -Djava.security.egd=file:/dev/./urandom -jar /app.jar"]