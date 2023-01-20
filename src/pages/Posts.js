/* import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const Posts = () => {
    
    const [token] = useOutletContext();
    return (
        <h1>Posts page</h1>
    );    
};

export default Posts; */

import { useState, useEffect } from "react";
import { fetchAllPost } from "../utils/API";
import PostList from "../utils/AllPosts";
import { useNavigate } from "react-router-dom";
//import { addPost } from "../utils/API";






const Posts = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        Promise.all([fetchAllPost()])
        .then(([posts]) => {
            setPosts(posts)
        })
    }, []);

    const navigate = useNavigate();
    const navigateToAddPost = () => {
        navigate('/addPost');
    };

    return (
        <div className="panel">
            <h1>Current Listings</h1>
            <button onClick={navigateToAddPost} class="add">Add New Post</button>
            <PostList posts={posts} />
        </div>
    )
};

export default Posts;

