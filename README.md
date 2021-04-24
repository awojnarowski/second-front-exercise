# second-front-exercise
This app is a GO HTTP server that serves a react app to query both Reddit and AlphaAdvantage's APIs to provide insight into what the internet is saying about your favorite stocks. 

The react frontend also leverages MaterialUI for quick stylings.

## Getting Started
To start the app first make sure you have docker and docker-compose installed. This app has been tested with the following versions:
* docker v20.10.5
* docker-compose v1.29.0

This project also uses the latest version of yarn to build the project. It's included in the container for convenience but can also be ran outside of the container if you choose.

## Starting The Server
To start the server simply run `docker-compose -f ./docker/docker-compose.yaml up` in the root directory of the project to start the devserver. You can pass `-d` at the end of the command if you wish to run it in a detached state. This will install node & go and start the server on `:8000`.

If you don't want to use docker and have GO installed on your local machine you can also skip this step and just start it by running `go run server.go` from the root directory to start your server.

If this is your first time starting the app you'll need to build the project otherwise you won't see much. If you make any changes a build will also need to be done for them to be reflected on the server.

## Building The Project With Docker
To build the project whether first starting or after making changes you can run the following:

First connect to the container with `docker exec -it web bash`

Then you can build
```
cd web
yarn build
```

## Building The Project Without Docker
Note, this process assumes you have yarn installed on your local system. From the web directory simply run `yarn build`.

And that's it! The app should now be running on `localhost:8000` and ready for use.