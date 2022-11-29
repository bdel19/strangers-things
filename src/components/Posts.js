import React from "react";
import PostItem from "./PostItem";
import {Link} from 'react-router-dom';
import '../App.css'

const Posts = ({posts, setPosts, token}) => {
    console.log("running Posts", posts)
    return (
    <>
        <Link to="posts/create" className="ui button">Create Post</Link>
        <div>
            <h1 className="ui dividing header">The Things</h1>
            
            <div className="post-container">
            {posts.map((item) => {
                return <PostItem 
                key={item._id}  
                posts={item} 
                setPost={setPost} 
                token={token}/>
            })}
            </div>
        </div>
    </>
    );
};

export default Posts;
