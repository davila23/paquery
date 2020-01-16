FROM openjdk:8u171-jdk-slim

VOLUME ["/tmp"]
VOLUME ["/build"]

MAINTAINER migue "miguel.torres@paquery.com"

RUN apt update && apt upgrade -y
RUN apt install curl unzip -y

RUN cd /root && curl -L 'https://services.gradle.org/distributions/gradle-5.2.1-bin.zip' -o ./gradle-5.2.1.zip \
    && unzip gradle-5.2.1.zip \
    && rm gradle-5.2.1.zip

ENV GRADLE_HOME=/root/gradle-5.2.1
ENV PATH=$PATH:$GRADLE_HOME/bin

WORKDIR /build

RUN gradle -v

CMD ["bash"]
