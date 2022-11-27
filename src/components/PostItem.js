import React from "react";
import {Link} from "react-router-dom";

const PostItem = ({posts}) => {
    return (
    <div className="ui card">
        <div className="content">
            <div className="centered aligned header">{posts.title}</div>
            <div className="centered aligned header">The Price:{posts.price}</div>
            <h6 className="centered aligned header">The Stranger: {posts.author.username}</h6>
            <Link to="">View More</Link>
        </div>
    </div>
    );
};

export default PostItem;