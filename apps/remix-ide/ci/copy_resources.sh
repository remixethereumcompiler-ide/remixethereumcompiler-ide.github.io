#!/bin/bash
set -e

rm -rf temp_publish_docker
mkdir temp_publish_docker
cp -r $FILES_TO_PACKAGE temp_publish_docker
ls
mv temp_publish_docker/production.index.html temp_publish_docker/index.html
