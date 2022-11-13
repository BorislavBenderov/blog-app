import { Routes, Route, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence, getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from './contexts/AuthContext';
import { PostContext } from './contexts/PostContext';
import { database } from './firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

import { Nav } from './components/nav/Nav';
import { Header } from './components/header/Header';
import { Login } from './components/login/Login';
import { Register } from './components/register/Register';
import { Posts } from './components/posts/Posts';
import { MyPosts } from './components/my-posts/MyPosts';
import { CurrentPost } from './components/posts/CurrentPost';
import { Create } from './components/create-post/Create';
import { Edit } from './components/edit-post/Edit';
import { Footer } from './components/footer/Footer';
import { useEffect, useState } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const collectionRef = collection(database, 'posts');

  useEffect(() => {
    onSnapshot(collectionRef, (data) => {
      setPosts(data.docs.map(item => {
        return { ...item.data(), id: item.id };
      }))
    })
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedUser(user);
      }
    })
  }, []);

  const onLogin = (auth, email, password) => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, email, password);
      })
      .catch((err) => {
        alert(err.message);
      });
    navigate('/');
  }

  const onRegister = (auth, email, password) => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        createUserWithEmailAndPassword(auth, email, password);
      })
      .catch((err) => {
        alert(err.message);
      });
    navigate('/');
  }

  return (
    <>
      <AuthContext.Provider value={{ auth, onLogin, onRegister, setLoggedUser, loggedUser }}>
        <Nav />
        <Header />
        <PostContext.Provider value={{ posts, collectionRef }}>
          <main className='site__content'>
            <Routes>
              <Route path='/' element={<Posts />} />
              <Route path='/myposts' element={loggedUser ? <MyPosts /> : <Posts />} />
              <Route path='/posts/:postId' element={<CurrentPost />} />
              <Route path='/create' element={loggedUser ? <Create /> : <Posts />} />
              <Route path='/edit/:postId' element={<Edit />} />
              <Route path='/register' element={!loggedUser ? <Register /> : <Posts />} />
              <Route path='/login' element={!loggedUser ? <Login /> : <Posts />} />
            </Routes>
          </main>
        </PostContext.Provider>
        <Footer />
      </AuthContext.Provider>
    </>
  );
}

export default App;
