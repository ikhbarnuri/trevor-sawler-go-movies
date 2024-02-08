import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function Movies() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json")

        const requestOptions = {
            method: "GET",
            headers: headers,
        }

        fetch(`http://localhost:8080/movies`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <div>
                <h2 className="text-center">Movies</h2>
                <hr/>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>Movie</th>
                        <th>Release Date</th>
                        <th>Rating</th>
                    </tr>
                    </thead>
                    <tbody>
                    {movies.map((movie, index) => (
                        <tr key={movie.id}>
                            <td>
                                <Link to={`/movies/${movie.id}`}>
                                    {movie.title}
                                </Link>
                            </td>
                            <td>{movie.releaseDate}</td>
                            <td>{movie.mpaa_rating}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Movies;