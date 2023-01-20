import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate} from "react-router-dom";
import { fetchAllPost } from "../utils/API";



export default function Root() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();
  const [posts, setPosts] = useState(localStorage.getItem('posts'));

  function logout() {
    
    localStorage.removeItem('token');
    setToken('');
    navigate('/home');
    
  };
  useEffect(() => {
    Promise.all([fetchAllPost()])
    .then(([posts]) => {
        setPosts(localStorage.setItem('posts', JSON.stringify(posts)))
    })
}, []);

  
  return (
    <div>
      <header>
        <div class='title'> Strangers Things</div>
        <nav>
          <Link to="home">Home</Link>
          {token ? <Link to="posts">Posts</Link> : ''}
          {token ? <Link to="profile">Profile</Link> : ''}
          {!token ? <Link to="register">Register</Link> : ''}
          {!token ? <Link to="login">Login</Link> : ''}
          {token ? <button onClick={logout}>Logout</button> : ''}
        </nav>    
      </header>
      
      <main>
         <Outlet context={[token, setToken]}/>
      </main>
      

      <footer>Strangers Things Copyright 2023</footer>
    </div>
  );
}