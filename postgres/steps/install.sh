#!/bin/bash

# Usage: ./check_docker_container.sh _container_id_
#
# The script checks if a container is running.
#   OK - running
#   WARNING - container is ghosted
#   CRITICAL - container is stopped
#   UNKNOWN - does not exist


IMAGE="udo_db"
CONT="udo_db_dev"

if [[ "$(docker images -q $IMAGE 2> /dev/null)" == "" ]]; then
  # not exist
  echo "Docker image doesn't exist, \n-- About to build image"
  docker build -t $IMAGE .
else
  # exist
  # echo "Docker image exist, \n-- Skipping build step"
  echo "Docker image exist, \n-- Stopping cont"
  docker stop $CONT
  docker rm $CONT
  docker build -t $IMAGE .
fi