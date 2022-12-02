import { setPersistence, createUserWithEmailAndPassword, browserLocalPersistence, updateProfile } from 'firebase/auth';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { doc, setDoc } from 'firebase/firestore';
import { database } from '../../firebaseConfig';

export const Register = () => {
    const { auth } = useContext(AuthContext);
    const { users } = useContext(UserContext);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const username = formData.get('username');
        const password = formData.get('password');
        const repeatPassword = formData.get('repeatPassword');

        const isUsernameInUse = users.find(user => user.username === username);

        if (password === '' || email === '' || repeatPassword === '') {
            alert('Please fill all the fields');
            return;
        }

        if (password !== repeatPassword) {
            alert('Your password and confirmation password do not match');
            return;
        }

        if (isUsernameInUse) {
            alert('This username is already in use!');
            return;
        }

        if (username.length < 2 || username.length > 10) {
            alert('Username must be more than 2 characters and less then 10!');
            return;
        }

        setPersistence(auth, browserLocalPersistence)
            .then(async () => {
                const res = await createUserWithEmailAndPassword(auth, email, password)
                setDoc(doc(database, 'users', res.user.uid), {
                    username,
                    uid: res.user.uid
                });
                updateProfile(res.user, {
                    displayName: username
                });
                navigate('/');
            })
            .catch((err) => {
                alert(err.message);
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