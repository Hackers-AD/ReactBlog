import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/home';
import Navbar from './components/navbar';
import Login from './components/login';
import Register from './components/register';
import Post from './components/post';
import Posts from './components/posts';
import Logout from './components/logout';
import Profile from './components/profile';
import EditPost from './components/editPost';

import { useDispatch } from 'react-redux';
import { fetch_user, fetch_auth, fetch_post } from './store/actions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch_auth());
    dispatch(fetch_user());
    dispatch(fetch_post());
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <div className='container my-2'>
        <div className='row justify-content-center'> 
          <div className='col-md-8'>
            <Routes>
              <Route path='' exact element={<Home />} />
              <Route path='login'  element={<Login />} />
              <Route path='logout'  element={<Logout />} />
              <Route path='register' element={<Register />} />
              <Route path='profile' element={<Profile />} />
              <Route path='post/:id' exact element={<Post />} />
              <Route path='post/edit/:postId' exact element={<EditPost />} />
              <Route path='search/:key' element={<Posts />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;


// import { app } from './firebase';
// import { getStorage } from 'firebase/storage';
// import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
// const storage = getStorage(app);
// const firestore = getFirestore(app);
// const auth = getAuth(app);