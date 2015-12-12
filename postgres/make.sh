#!/bin/bash

# bash --login '/Applications/Docker/Docker Quickstart Terminal.app/Contents/Resources/Scripts/start.sh'


# remove all containers
# docker rm $(docker ps -a -q)
# docker rmi udo_db_dev

docker exec -i -t udo_db_dev sh /var/lib/postgresql/create_db/create_db.sh