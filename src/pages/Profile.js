/* import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import jwt_decode from 'jwt-decode';
const Profile = () => {
    const [messages, setMessages] = useState([]);
    const [token] = useOutletContext();
    const { username } = jwt_decode(token);
    return (
        <h1>Welcome { username } ! </h1>

    );
    
};

export default Profile; */
import { useState, useEffect } from "react";
import { myMessages } from "../utils/API";

import jwt_decode from 'jwt-decode';


const Profile = () => {
    const token = localStorage.getItem('token')
    const [messageToUser, setMessageToUser] = useState([]);
    const [messageFromUser, setMessageFromUser] = useState([]);
    const { username } = jwt_decode(token);
    
    useEffect(() => {
        Promise.all([myMessages(token)])
        .then(([data]) => {
            setMessageFromUser(data.messages)
            let initial = []
            const getMessagesToUser = data.posts.reduce(
                (accumulator, currentPost) => {
                    const currentMessages = currentPost.messages.map((message) => (
                        {...message, title: currentPost.title}
                    ))
                    return accumulator.concat(currentMessages)
                },
                initial
            );
            setMessageToUser(getMessagesToUser);
        })
    }, [token]);

    return (
        <div className="panel">
            <h1>Welcome Back { username } ! </h1>
            <h3 class="subtitle">Recieved Messages:</h3>
            {
                messageToUser?.map(({ _id, title, fromUser, content }) => (
                    <div key={_id} className="posts">
                        <h2>From: {fromUser.username}</h2>
                        <h4>Message: {content}</h4>
                        <h4>To post: {title}</h4>
                    </div>
                ))
            }
            <h3 class="subtitle">Sent Messages:</h3>
            {
                messageFromUser?.map(({ _id, post, fromUser, content }) => (
                    <div key={_id} className="posts">
                        <h2>From: {fromUser.username}</h2>
                        <h4>Message: {content}</h4>
                        <h4>To post: {post.title}</h4>
                    </div>))
            }
        </div>
    )
};

export default Profile;