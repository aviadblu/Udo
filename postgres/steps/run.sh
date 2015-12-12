#!/bin/bash

CONTAINER="udo_db_dev"

RUNNING=$(docker inspect --format="{{ .State.Running }}" $CONTAINER 2> /dev/null)

if [ $? -eq 1 ]; then
  echo "UNKNOWN - $CONTAINER does not exist."
  echo "About to run docker"
  docker run --rm -p 5432:5432 -P --name udo_db_dev udo_db
  exit 3
fi

if [ "$RUNNING" == "false" ]; then
  echo "CRITICAL - $CONTAINER is not running."
  docker stop udo_db_dev
  docker run --rm -p 5432:5432 -P --name udo_db_dev udo_db
  exit 2
fi

GHOST=$(docker inspect --format="{{ .State.Ghost }}" $CONTAINER)

if [ "$GHOST" == "true" ]; then
  echo "WARNING - $CONTAINER has been ghosted."
  docker stop udo_db_dev
  docker run --rm -p 5432:5432 -P --name udo_db_dev udo_db
  exit 1
fi

STARTED=$(docker inspect --format="{{ .State.StartedAt }}" $CONTAINER)
NETWORK=$(docker inspect --format="{{ .NetworkSettings.IPAddress }}" $CONTAINER)

echo "OK - $CONTAINER is running. IP: $NETWORK, StartedAt: $STARTED"