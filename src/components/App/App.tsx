import React, {useState} from 'react';
import './App.scss';
import Counter from "../Counter/Counter";
import PostsContainer from "../PostsContainer/PostsContainer";

function App() {
    return (
        <div className="container">
            <PostsContainer/>
        </div>
    );
}

export default App;
