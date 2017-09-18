FROM alpine
# load any public updates from Alpine packages
RUN apk update
# upgrade any existing packages that have been updated
RUN apk upgrade
# add/install python3 and related libraries
# https://pkgs.alpinelinux.org/package/edge/main/x86/python3
RUN apk add nodejs nodejs-npm
# make a directory for our application
WORKDIR /src
# move requirements file into the container
COPY package.json .
COPY package-lock.json .
# install the library dependencies for this application
RUN npm install --production
# copy in the rest of our local source
COPY . .
# set the debug environment variable
ENV DEBUG=kfd-nodejs:*
CMD ["npm", "start"]
