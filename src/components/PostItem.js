import React from "react";
import {Link} from "react-router-dom";




const PostItem = ({posts, setPost, token}) => {
    console.log("running PostItem")
    
    //if(post.isCreator){}
    //  posts.messages = [
    //      {
    //          "_id": "5e8d1fd747b6ce0017600594",
    //              "content": "I really love this item.  Can I have it?",
    //              "post": "5e8d1f2539e7a70017a7c965",
    //              "fromUser": "Bobby",
    //              "createdAt": "2020-04-08T00:50:31.402Z",
    //              "updatedAt": "2020-04-08T00:50:31.402Z",
    //              "__v": 0
    //      }
    //  ];
    // }
    
    return (
    <div className="ui card">
        <div className="content">
            <div className="left floated aligned header">
                {posts.title}
            </div>
                {posts.isCreator ? 
                    <div className="right floated aligned tiny header">
                        Mine
                    </div> : null}
            <div className="centered aligned description">
                <p>{posts.description}</p>
                <h6><b>Price:</b>{posts.price}</h6>
                <h4><b>Stranger:</b> {posts.author.username}</h4>
                <div className="extra content">
                    <Link to="">View Location</Link>
                </div>
            <div >
                {posts.isCreator && token ? (<button>Delete Post</button>) : null}

                {posts.messages.map((message) => {
                    return (
                        <div>
                        <span>{message.fromUser}</span>
                        <p>{message.content}</p>
                    </div>)
                })}
            </div>
            </div>
        </div>
    </div>
    );
};

export default PostItem;