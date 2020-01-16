FROM nginx:1.15.9

LABEL maintainer="miguel.torres@paquery.com"

# ARG SERVER_NAME

RUN mkdir -p /etc/certs

COPY nginx.conf /etc/nginx/nginx.conf
COPY entrypoint-nginx.sh /entrypoint.sh

# EVN SERVER_NAME=$SERVER_NAME

RUN chmod +x /entrypoint.sh

# RUN echo "ejecutando sed -i "s/__SERVER_NAME__/$SERVER_NAME/g" /etc/nginx/nginx.conf"
# RUN sed -i "s/__SERVER_NAME__/$SERVER_NAME/g" /etc/nginx/nginx.conf

RUN cat /etc/nginx/nginx.conf


#ENV SERVER_NAME "api-pre.paquery.com"

ENTRYPOINT [ "/entrypoint.sh" ]
