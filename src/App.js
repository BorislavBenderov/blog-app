import { Nav } from './components/nav/Nav';
import { Header } from './components/header/Header';
import { Login } from './components/login/Login';
import { Register } from './components/register/Register';
import { Posts } from './components/posts/Posts';
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

      </main>
      <Footer />
    </>
  );
}

export default App;
