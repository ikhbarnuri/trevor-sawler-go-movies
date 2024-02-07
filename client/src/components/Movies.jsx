import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function Movies() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        let movieList = [
            {
                id: 1,
                title: "Highlander",
                releaseDate: "1900-03-09",
                runtime: 116,
                mpaa_rating: "R",
                description: "Some long description",
            },
            {
                id: 2,
                title: "Raiders of The Lost Ark",
                releaseDate: "1981-06-12",
                runtime: 115,
                mpaa_rating: "PG-13",
                description: "Some long description",
            }
        ];

        setMovies(movieList)
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