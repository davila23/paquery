#!/bin/bash

cd ../..


#build_gradle_path="build.gradle"

tagImage="$1"
registry="${2:-us.icr.io/paquery}"

appname=`head -10 build.gradle | grep "name:" | grep -E "'(.*)'" -o | sed "s/\'//g"`
#export appname=${appname:1:-1}

version=`head -10 build.gradle | grep "appVersion:" | grep -E "'(.*)'" -o | sed "s/\'//g"`
#export version=${version:1:-1}

versionType=`head -11 build.gradle | grep "versionType:" | grep -E "'(.*)'" -o | sed "s/\'//g"`
#export versionType=${versionType:1:-1}


#sdk u gradle 5.2.1

if [ -s "$SDKMAN_DIR/bin/sdkman-init.sh" ]; then
    source "$SDKMAN_DIR/bin/sdkman-init.sh"
    sdk u gradle 5.2.1
fi

gradle clean
gradle build -x test

if [[ "$?" != "0" ]]; then
    echo "FALLO BUILD"
fi;

docker build    --build-arg appname=${appname} \
                --build-arg version=${version} \
                --build-arg versionType=${versionType} \
                -t ${registry}/${appname}:${version} -f docker/builder/Dockerfile .