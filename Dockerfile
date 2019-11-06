FROM alpine:latest

# Install required packages in the alpine image
RUN apk add --update \
    git \
    libc-dev \
    nodejs \
    npm \
    yarn \
    rm -rf /var/cache/apk/*

# Copying the project source to the docker image
EXPOSE 50000
COPY ./app/ /app/

# Installing dependencies
WORKDIR /app/backend/
RUN npm install pm2 -g
RUN /bin/sh system rnodemod
RUN /bin/sh system build

# start the script
ENTRYPOINT [ "sh", "system", "sysinit" ]