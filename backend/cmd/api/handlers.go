package main

import (
	"backend/internal/models"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

func (app *application) Home(w http.ResponseWriter, r *http.Request) {
	var payload = struct {
		Status  string `json:"status"`
		Message string `json:"message"`
		Version string `json:"version"`
	}{
		Status:  "active",
		Message: "Go movies up and running",
		Version: "1.0.0",
	}

	out, err := json.Marshal(payload)
	if err != nil {
		fmt.Println(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(out)
}

func (app *application) AllMovies(w http.ResponseWriter, r *http.Request) {
	var movies []models.Movie

	releaseDate, _ := time.Parse("2006-01-02", "1986-03-07")

	highLander := models.Movie{
		ID:          1,
		Title:       "Highlander",
		ReleaseDate: releaseDate,
		RunTime:     116,
		MPAARating:  "R",
		Description: "A very nice movie",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	movies = append(movies, highLander)

	releaseDate, _ = time.Parse("2006-01-02", "1981-06-12")

	rotl := models.Movie{
		ID:          1,
		Title:       "Raiders of the Lost Ark",
		ReleaseDate: releaseDate,
		RunTime:     115,
		MPAARating:  "PG-13",
		Description: "Another very nice movie",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	movies = append(movies, rotl)

	out, err := json.Marshal(movies)
	if err != nil {
		fmt.Println(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(out)
}
