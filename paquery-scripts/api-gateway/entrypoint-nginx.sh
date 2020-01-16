#!/bin/bash

#echo "Set servername = ${SERVER_NAME} ..."
#sed -i "s/__SERVER_NAME__/$SERVER_NAME/g" /etc/nginx/nginx.conf

echo "Run Nginx..."
exec nginx -g "daemon off;"
