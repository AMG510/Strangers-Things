import { /*useLocation,*/ useNavigate} from "react-router-dom";
import jwt_decode from 'jwt-decode';
//import { postDelete } from "./API";

const PostList = ({ posts }) => {
    
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    //const {state} = useLocation;//
    //const {_id} = state;//
    
    const { username } = jwt_decode(token);

    const goToSendMessage = (_id, author, description, price, location, title, isAuthor) => {
        navigate('/sendMessage', {state: { _id, author, description, price, location, title, isAuthor }});
    };
    const goToSinglePost = (_id, author, description, price, location, title, isAuthor, messages) => {
        navigate('/singlePost', {state: { _id, author, description, price, location, title, isAuthor, messages }});
    };

    /*async function deletePost(e) {
        e.preventDefault()
        const response = await postDelete(_id, token);
        navigate('/posts');
        return response;
    }*/


    return (
        <section>
            {
                posts.map(({ _id, author, description, price, location, title, isAuthor, willDeliver })=> (
                    <div key={_id} class="posts">
                        <div onClick={() => goToSinglePost(_id, author, description, price, location, title, isAuthor)}>
                            <h2>{title}</h2>
                            {description ? <h4>Description: {description}</h4> : null}
                            {price ? <h4>Price: {price}</h4> : null}
                            {author ? <h4>Seller: {author.username}</h4> : null}
                            {location ? <h4>Location: {location}</h4> : null}
                            {willDeliver ? <h4>Willing to Deliver: Yes</h4> : <h4>Willing to Deliver: No</h4>}
                        </div>
                        <div>
                            {author.username === username ? null : <button onClick={() => goToSendMessage(_id, author, description, price, location, willDeliver, title, isAuthor)} class="send">Send Message</button>}
                            {author.username === username ? <p /*onClick={deletePost}*/ class="info">CLICK ON POST TO VIEW OR DELETE POST</p> : null}
                        </div>
                    </div>
                ))
            }
        </section>
    )
    
}

export default PostList;

/* return (
    <section className="Posts">
        {
            posts.map(({ id, author, description, price, location, willDeliver, title })=> (
                <div key={id}>
                    <h2>{title}</h2>
                    {description ? <h4>{description}</h4> : null}
                    {price ? <h4>Price: {price}</h4> : null}
                    {author ? <h4>Seller: {author.username}</h4> : null}
                    {location ? <h4>Location: {location}</h4> : null}
                    {willDeliver ? <h4>Willing to Deliver? Yes</h4> : <h4>Willing to Deliver? No</h4>}
                </div>
            ))
        }
    </section>
) */