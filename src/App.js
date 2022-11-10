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
import { Post } from './components/posts/Post';
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
console.log(posts);
  return (
    <>
      <AuthContext.Provider value={{ auth, onLogin, onRegister, setLoggedUser, loggedUser }}>
        <Nav />
        <Header />
        <PostContext.Provider value={{ collectionRef }}>
          <main className='site__content'>
            <Routes>
              <Route path='/' element={<Posts />} />
              <Route path='/myposts' element={<MyPosts />} />
              <Route path='/posts/:postId' element={<Post />} />
              <Route path='/create' element={<Create />} />
              <Route path='/edit/:postId' element={<Edit />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </main>
        </PostContext.Provider>
        <Footer />
      </AuthContext.Provider>
    </>
  );
}

export default App;
