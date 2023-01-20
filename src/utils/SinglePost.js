import { useLocation, useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { useState } from "react";
import { postDelete } from "./API";

const SinglePost = () => {
    const token = localStorage.getItem('token')
    const { username } = jwt_decode(token);
    const { state } = useLocation();
    const { _id } = state;
    const [currentPost, setCurrentPost] = useState({...state});
    const { author, description, price, location, willDeliver, title, messages } = currentPost;
    const navigate = useNavigate();
    async function deletepost(e) {
        e.preventDefault()
        const response = await postDelete(_id, token);
        navigate('/posts');
        return response
    }
    
    return (
        <>
            <div key={_id} className="posts">
                <h2>{title}</h2>
                {description ? <h4>Description: {description}</h4> : null}
                {price ? <h4>Price: {price}</h4> : null}
                {author ? <h4>Seller: {author.username}</h4> : null}
                {location ? <h4>Location: {location}</h4> : null}
                {willDeliver ? <h4>Willing to Deliver? Yes</h4> : <h4>Willing to Deliver? No</h4>}
                {author.username === username ? <button onClick={deletepost} class="delete">DELETE POST</button> : null}
            </div>
            
            <div>
                {
                author.username === username 
                ? null : 
                messages?.map(({ _id, content, fromUser }) => (
                    <div key={_id}>
                        <h2>From: {fromUser}</h2>
                        <h4>{content}</h4>
                    </div>
                ))
                }
            </div>
        </>
    )
}

export default SinglePost;