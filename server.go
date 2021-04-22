package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	mux := http.NewServeMux()
	buildHandler := http.FileServer(http.Dir("web/build"))
	mux.Handle("/", buildHandler)

	server := &http.Server{
		Handler: mux,
		Addr: "0.0.0.0:8000",
	}
	
	fmt.Print("Server Started on 8000")
	log.Fatal(server.ListenAndServe())
}

func index(writer http.ResponseWriter, request *http.Request) {
	http.ServeFile(writer, request, "/web/build/index.html")
}