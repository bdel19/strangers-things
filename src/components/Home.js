import React from 'react';

const Home = ({user}) => {
    return (
        <div>
            <h1 className="ui header">Stranger's Things</h1>
            {user && <h3>You are logged in as: {user}</h3>}
        </div>
    )
};

export default Home;
