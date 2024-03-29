import {Link, Outlet, useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import Alert from "./components/form/Alert.jsx";

function App(callback, deps) {
    const [jwtToken, setJwtToken] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const [alertClassName, setAlertClassName] = useState("d-none")

    const [tickInterval, setTickInterval] = useState()

    const navigate = useNavigate();

    const handleLogout = () => {
        const requestOptions = {
            method: "GET",
            credentials: "include"
        }

        fetch("http://localhost:8080/logout", requestOptions)
            .catch(error => {
                console.log("error logging out", error)
            })
            .finally(() => {
                navigate("/login")
                toggleRefresh(false)
            })
    }

    const toggleRefresh = useCallback((status) => {
        console.log("clicked")

        if (status) {
            console.log("turning on ticking")
            let i = setInterval(() => {
                const requestOptions = {
                    method: "GET",
                    credentials: "include"
                }

                fetch("http://localhost:8080/refresh", requestOptions)
                    .then((response) => response.json())
                    .then(data => {
                        if (data.token) {
                            setJwtToken(data.token)
                        }
                    })
                    .catch(error => {
                        console.log("user is not logged in", error)
                    })
            }, 600000)
            setTickInterval(i)
            console.log("setting tick interval to", i)
        } else {
            console.log("turning off ticking")
            console.log("turning off tickInterval", tickInterval)
            setTickInterval(null)
            clearInterval(tickInterval)
        }
    }, null)


    useEffect(() => {
        if (jwtToken === "") {
            const requestOptions = {
                method: "GET",
                credentials: "include"
            }

            fetch("http://localhost:8080/refresh", requestOptions)
                .then((response) => response.json())
                .then(data => {
                    if (data.token) {
                        setJwtToken(data.token)
                    }
                })
                .catch(error => {
                    console.log("user is not logged in", error)
                })
        }
    }, [jwtToken, toggleRefresh]);

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className="mt-3">Go Watch a Movie!</h1>
                </div>
                <div className="col text-end">
                    {jwtToken === "" ? (
                        <Link to="/login"><span className="badge bg-success">Login</span></Link>
                    ) : (
                        <a href="#!" onClick={handleLogout}><span className="badge bg-danger">Logout</span></a>
                    )}
                </div>
                <hr className="mb-3"/>
            </div>

            <div className="row">
                <div className="col-md-2">
                    <nav>
                        <div className="list-group">
                            <Link to="/" className="list-group-item list-group-item-action">Home</Link>
                            <Link to="/movies" className="list-group-item list-group-item-action">Movies</Link>
                            <Link to="/genres" className="list-group-item list-group-item-action">Genres</Link>
                            {jwtToken !== "" && (
                                <>
                                    <Link to="/admin/movie/create" className="list-group-item list-group-item-action">Add
                                        Movie</Link>
                                    <Link to="/manage-catalogue" className="list-group-item list-group-item-action">Manage
                                        Catalogue</Link>
                                    <Link to="/graphql"
                                          className="list-group-item list-group-item-action">GraphQL</Link>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
                <div className="col-md-10">
                    <a className="btn btn-outline-secondary" href="#!" onClick={toggleRefresh}>Toggle Ticking</a>
                    <Alert message={alertMessage} className={alertClassName}/>
                    <Outlet context={{
                        jwtToken,
                        setJwtToken,
                        setAlertClassName,
                        setAlertMessage,
                        toggleRefresh
                    }}/>
                </div>
            </div>
        </div>
    );
}

export default App;