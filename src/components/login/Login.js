import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import './login.css';

export const Login = () => {
    const { auth, onLogin } = useContext(AuthContext);

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if (password === '' || email === '') {
            alert('Please fill all the fields');
            return;
        }

        onLogin(auth, email, password);
    }

    return (
        <form className='auth' onSubmit={onSubmit}>
            <h3>Login Here</h3>
            <label htmlFor="email">Username</label>
            <input type="text" placeholder="Email" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" id="password" name="password" />
            <button type="submit">Log In</button>
        </form>
    );
}