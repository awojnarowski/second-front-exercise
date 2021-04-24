FROM node:14.16.0
#install all dependencies
RUN apt-get update && \
    apt-get -y upgrade && \
    apt-get install software-properties-common -y && \
    add-apt-repository ppa:longsleep/golang-backports -y && \
    apt-get install golang-go -y && \
    apt-get install yarn -y