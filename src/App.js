import { Routes, Route, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence, getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from './contexts/AuthContext';
import { database } from './firebaseConfig';

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
  const [loggedUser, setLoggedUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

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
      <AuthContext.Provider value={{ auth, onLogin, onRegister }}>
        <Nav />
        <Header />
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
        <Footer />
      </AuthContext.Provider>
    </>
  );
}

export default App;
