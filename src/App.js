import { Routes, Route } from 'react-router-dom';

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

function App() {
  return (
    <>
      <Nav />
      <Header />
      <main className='site__content'>
        <Routes>
          <Route path='/' element={<Posts />}/>
          <Route path='/myposts' element={<MyPosts />}/>
          <Route path='/posts/:postId' element={<Post />}/>
          <Route path='/create' element={<Create />}/>
          <Route path='/edit/:postId' element={<Edit />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
