import { useState, useEffect } from "react";
import { sendMessage } from "./API";
import { useLocation } from "react-router-dom";
//import { fetchAllPost } from "./API";


const SendMessage = () => {
    const [content, setContent] = useState('');
    const { state } = useLocation();
    const [sentMessage, setSentMessage] = useState(true)
    const { title, _id, author, description, price, location, willDeliver } = state;
    //const [posts, setPosts] = useState(localStorage.getItem('posts'));

    /*useEffect(() => {
        Promise.all([fetchAllPost()])
        .then(([posts]) => {
            setPosts(localStorage.setItem('posts', JSON.stringify(posts)))
        })
    }, []);*/
    
    async function submitMessage(e) {
        e.preventDefault();

        const message = {
            message: {
                content
            }
        }
        const posts = JSON.parse(localStorage.getItem('posts'))
        const post = posts.filter(post => post._id === _id)[0];
        const token = localStorage.getItem('token')
        
        const response = await sendMessage(message, post._id, token);
        setSentMessage(false)
        return response;
    }

    return (
        <section key={_id}>
            <div className="posts" >
                {title ? <h2>{title}</h2> : null}
                {description ? <h4>{description}</h4> : null}
                {price ? <h4>Price: {price}</h4> : null}
                {author ? <h4>Seller: {author.username}</h4> : null}
                {location ? <h4>Location: {location}</h4> : null}
                {willDeliver ? <h4>Willing to Deliver? Yes</h4> : <h4>Willing to Deliver? No</h4>}
            </div>
            {
                sentMessage ? 
                    <form onSubmit={submitMessage} className="panel">
                        <h2>Message User</h2>
                        <input 
                        type="text" 
                        value={content}
                        placeholder="Message"
                        onChange={(e) => setContent(e.target.value)}
                        />
                        <button type="submit" className="">Send Message</button>
                    </form> 
                : <h4>Message sent </h4>
            }
        </section>
    )
}


export default SendMessage; 


/* const SendMessage = (token) => {
    const [message, setMessage] = useState('');
    const [sentMessage, setSentMessage] = useState('');
    const { state } = useLocation();
    const { title, _id, author, description, price, location, willDeliver } = state;
    

    async function submitForm(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await sendMessage(message, _id)
        setMessage('');
        setSentMessage('Message Sent');
    }
    return (
        <section key={_id}>
            <div className="posts" >
                {title ? <h2>{title}</h2> : null}
                {description ? <h4>{description}</h4> : null}
                {price ? <h4>Price: {price}</h4> : null}
                {author ? <h4>Seller: {author.username}</h4> : null}
                {location ? <h4>Location: {location}</h4> : null}
                {willDeliver ? <h4>Willing to Deliver? Yes</h4> : <h4>Willing to Deliver? No</h4>}
            </div>
            {
                    <form onSubmit={submitForm} className="panel">
                        <h2>Message User</h2>
                        <input 
                        type="text" 
                        value={message}
                        placeholder="Message"
                        onChange={(e) => setMessage(e.target.value)}
                        />
                        <button type="submit" className="">Send Message</button>
                        <p>{sentMessage}</p>
                    </form> 
            }
        </section>
    ) 


} */
