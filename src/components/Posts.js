import React from "react";
import PostItem from "./PostItem";

const Posts = ({posts}) => {
    console.log("posts", posts);
    return (
        <div >
            <h1 className="ui dividing header">The Things</h1>
            
            <div className="ui divided three column grid">
            {posts.map((item) => {
                return <PostItem key={item._id}  posts={item}/>
            })}
            </div>
        </div>
    );
};

export default Posts;
