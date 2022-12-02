import { setPersistence, createUserWithEmailAndPassword, browserLocalPersistence } from 'firebase/auth';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

export const Register = () => {
    const { auth } = useContext(AuthContext);
    const { users } = useContext(UserContext);
    console.log(users);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const repeatPassword = formData.get('repeatPassword');

        if (password === '' || email === '' || repeatPassword === '') {
            alert('Please fill all the fields');
            return;
        }

        if (password !== repeatPassword) {
            alert('Your password and confirmation password do not match');
            return;
        }

        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                createUserWithEmailAndPassword(auth, email, password)
                    .then(() => {
                        navigate('/');
                    })
                    .catch((err) => {
                        alert(err.message);
                    });
            })
    }

    return (
        <form className='auth' onSubmit={onSubmit}>
            <h3>Register Here</h3>
            <label htmlFor="email"></label>
            <input type="text" placeholder="Email" id="email" name="email" />
            <label htmlFor="username"></label>
            <input type="text" placeholder="Username" id="username" name="username" />
            <label htmlFor="password"></label>
            <input type="password" placeholder="Password" id="password" name="password" />
            <label htmlFor="repeatPassword"></label>
            <input type="password" placeholder="Repeat Password" id="repeatPassword" name="repeatPassword" />
            <button type="submit">Register</button>
        </form>
    );
}