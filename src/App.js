import React, {useState, useEffect } from "react";
import { Home, Posts, Account, PostCreateForm } from "./components";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { fetchPosts, fetchUser } from "./api/api";
import "./App.css";

const App = () => {
    console.log("running App")
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState(
        window.localStorage.getItem("token") || null
    );
    const [user, setUser] = useState(null);

    const history = useHistory();
    

    useEffect(() => {
        const getPosts = async() => {
            console.log("running getPosts")
            const {error, posts} = await fetchPosts(token);

            if (error) {
                console.error(error)
            }

            setPosts(posts);
        };
        getPosts(); 
    }, []);

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                console.log("running getUser")
                const { user } = await fetchUser(token);
                setUser(user);
                console.log("USER", user);
            };
            getUser();
        };
    }, [token]);

    useEffect(() => {
        if (token){
        window.localStorage.setItem("token", token);
        } else {
            window.localStorage.removeItem("token");
        }
    },[token]);

    const logOut = () => {
        setToken(null);
        setUser(null);
        history.push("/");
    };

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
                    <Link className="item" to ="/account/register">Sign Up</Link>
                    </>
                    )}
                    
                </span>
            </nav>
            <Switch>
                
                <Route exact path="/">
                    <Home user = {user}/>
                </Route>
                
                <Route className="item" path="/posts/create">
                    <PostCreateForm token={token} setPosts={setPosts}/>
                </Route>
                
                <Route className="item" path="/posts">
                    <Posts posts={posts} token={token} setPosts={setPosts}/>
                </Route>
                
                <Route className="item" path="/account/:action">
                    <Account setToken={setToken}/>
                </Route>

            </Switch>
        </div>
    );
    
};

export default App;
