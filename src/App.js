import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './App.css';
import NotFound from "./NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Root from "./pages/Root";
import Posts from "./pages/Posts";
import AddPost from "./utils/AddPost";
import SendMessage from "./utils/SendMessage";
import SinglePost from "./utils/SinglePost";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "addPost",
        element: <AddPost />
      }, 
      {
        path: "sendMessage",
        element: <SendMessage />
      },
      {
        path: "singlePost",
        element: <SinglePost />
      }
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;



/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App; */
