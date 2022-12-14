import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { PostContextProvider } from './contexts/PostContext';
import { UserContextProvider } from './contexts/UserContext';
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
import { EditUser } from './components/user-profile/EditUser'
import { ProtectedRoutes } from './ProtectedRoutes';

function App() {
  return (
    <>
      <AuthContextProvider>
        <PostContextProvider>
          <UserContextProvider>
            <Nav />
            <Header />
            <main className='site__content'>
              <Routes>
                <Route path='*' element={<NotFound />} />
                <Route path='/' element={<Posts />} />
                <Route path='/posts/:postId' element={<CurrentPost />} />
                <Route path='/user/edit/:userId' element={<EditUser />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path='/myposts' element={<MyPosts />} />
                  <Route path='/create' element={<Create />} />
                  <Route path='/edit/:postId' element={<Edit />} />
                </Route>
              </Routes>
            </main>
            <Footer />
          </UserContextProvider>
        </PostContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
