#!/bin/bash

projectPath=$1
dockerBuilder=${2:-java8builder:1.0.0}

docker run --rm --name builder-java8 -v $projectPath:/build -v ~/.m2:/root/.m2 $dockerBuilder \
  gradle build -x test --no-daemon
