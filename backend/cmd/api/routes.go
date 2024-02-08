package main

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"net/http"
)

func (app *application) routes() http.Handler {
	mux := chi.NewMux()

	mux.Use(middleware.Recoverer)

	mux.Get("/", app.Home)
	mux.Get("/movies", app.AllMovies)

	return mux
}
