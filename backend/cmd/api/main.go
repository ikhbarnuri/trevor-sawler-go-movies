package main

import (
	"fmt"
	"log"
	"net/http"
)

const port = 8000

type application struct {
	Domain string
}

func main() {
	var app application

	app.Domain = "example.com"

	log.Println("Starting application on port", port)

	http.HandleFunc("/", Hello)

	err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	if err != nil {
		log.Fatal(err)
	}
}
