#!/bin/bash

# Prepare log files and start outputting logs to stdout
#mkdir -p /usr/src/app/logs/


echo "Starting nginx"
exec nginx
"$@"
