import { setPersistence, signInWithEmailAndPassword, browserLocalPersistence } from 'firebase/auth';
import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './login.css';

export const Login = () => {
    const [err, setErr] = useState('');
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if (password === '' || email === '') {
            setErr('Please fill all the fields');
            return;
        }

        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                signInWithEmailAndPassword(auth, email, password)
                    .then(() => {
                        navigate('/');
                    })
                    .catch((err) => {
                        setErr(err.message);
                    });
            })
    }

    return (
        <form className='auth' onSubmit={onSubmit}>
            <h3>Login Here</h3>
            <label htmlFor="email">Email</label>
            <input type="text" placeholder="Email" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" id="password" name="password" />
            <button type="submit">Log In</button>
            <p className='error'>{err}</p>
        </form>
    );
}