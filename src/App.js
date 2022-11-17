import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
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
import { useContext } from 'react';

function App() {  
  const { loggedUser } = useContext(AuthContext);
  
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Header />
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
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
