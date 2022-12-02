import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Nav } from './components/nav/Nav';
import { Header } from './components/header/Header';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Posts } from './components/posts/Posts';
import { MyPosts } from './components/posts/my-posts/MyPosts';
import { CurrentPost } from './components/posts/CurrentPost';
import { Create } from './components/posts/create-edit/Create';
import { Edit } from './components/posts/create-edit/Edit';
import { Footer } from './components/footer/Footer';
import { NotFound } from './components/not-found/NotFound';
import { ProtectedRoutes } from './ProtectedRoutes';

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Header />
        <main className='site__content'>
          <Routes>
            <Route path='*' element={<NotFound />} />
            <Route path='/' element={<Posts />} />
            <Route path='/posts/:postId' element={<CurrentPost />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/myposts' element={<MyPosts />} />
              <Route path='/create' element={<Create />} />
              <Route path='/edit/:postId' element={<Edit />} />
            </Route>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
