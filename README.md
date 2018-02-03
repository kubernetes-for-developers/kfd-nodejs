# kfd-nodejs

sample Node.js application for Kubernetes for Developers

## to run locally

    DEBUG=kfd-nodejs:server,http,mail,express:* npm start

## to rebuild all the images

(this may need to be done to resolve any underlying image issues, such
as security updates or vulnerabilities found and resolved in Alpine)

The container images associated with this repo are available for review at
https://quay.io/repository/kubernetes-for-developers/nodejs?tab=tags

    git checkout 0.2.0
    docker build -t quay.io/kubernetes-for-developers/nodejs:0.2.0 .
    git checkout 0.3.0
    docker build -t quay.io/kubernetes-for-developers/nodejs:0.3.0 .
    git checkout 0.4.0
    docker build -t quay.io/kubernetes-for-developers/nodejs:0.4.0 .
    git checkout 0.5.0
    docker build -t quay.io/kubernetes-for-developers/nodejs:0.5.0 .
    git checkout master
    docker build -t quay.io/kubernetes-for-developers/nodejs:latest .
    docker push quay.io/kubernetes-for-developers/nodejs
