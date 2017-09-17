FROM alpine
# load any public updates from Alpine packages
RUN apk update
# upgrade any existing packages that have been updated
RUN apk upgrade
# add/install python3 and related libraries
# https://pkgs.alpinelinux.org/package/edge/main/x86/python3
RUN apk add nodejs nodejs-npm
# make a directory for our application
RUN mkdir -p /opt/expressapp
# move requirements file into the container
COPY . /opt/expressapp/
# install the library dependencies for this application
RUN cd /opt/expressapp && npm install --production
#ENTRYPOINT ["node"]
#CMD ["/opt/exampleapp/index.js"]
