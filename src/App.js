import React, {useState, useEffect } from "react";
import { Home, Posts, Account } from "./components";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { fetchPosts, fetchUser } from "./api/api";
import "./App.css";

const App = () => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token") || null);
    const [user, setUser] = useState(null);
    const history = useHistory();
    

    useEffect(() => {
        const getPosts = async() => {
            const {error, posts} = await fetchPosts();

            if (error) {
                console.error(error)
            }

            setPosts(posts);
        };
        getPosts(); 
    }, []);

    useEffect(() => {
        console.log("HEY!");
        if (token) {
            const getUser = async () => {
                const { user } = await fetchUser(token);
                setUser(posts.username);
                console.log("USER",user);
            }
            getUser();
        }
    }, [token]);

    useEffect(() => {
        window.localStorage.setItem("token", token)
    },[token]);

    const logOut = () => {
        setToken("");
        setUser(null);
        history.push("/");
    }

    return (
        <div className="container">
            <nav className="ui secondary menu">
                <Link className="item" to="/">Home</Link>
                <Link className="item" to="/posts">Posts</Link>
                <span className="right menu">
                    {token ? (
                        <button className="item" onClick={logOut}>
                            Logout
                        </button>
                    ):(
                    <>
                    <Link className="item" to ="/account/login">Log In</Link>
                    <Link className="item" to ="/account/signup">Sign Up</Link>
                    </>
                    )}
                    
                </span>
            </nav>
            <Switch>
                <Route className="item" exact path="/">
                    <Home user = {user}/>
                </Route>
                <Route className="item" path="/posts">
                    <Posts posts={posts}/>
                </Route>
                <Route className="item" path="/account/:action">
                    <Account setToken={setToken}/>
                </Route>
            </Switch>
        </div>
    );
    
};

export default App;
