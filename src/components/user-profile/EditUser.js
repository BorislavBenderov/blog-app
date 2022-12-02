import { useContext, useState } from "react";
import { UserContext } from '../../contexts/UserContext';
import { AuthContext } from '../../contexts/AuthContext';
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

export const EditUser = () => {
    const { users } = useContext(UserContext);
    const { loggedUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const currentUser = users.find(user => user.uid === loggedUser.uid);
    const [value, setValue] = useState({
        username: currentUser?.username
    });

    const onEditUser = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const username = formData.get('username');
        const isUsernameInUse = users.filter(user => user.uid !== loggedUser.uid).find(user => user.username === username);

        if (isUsernameInUse) {
            alert('This username is already in use!');
            return;
        }

        if (username === '') {
            alert('Please set a username!');
            return;
        }

        if (username.length < 2 || username.length > 10) {
            alert('Username must be more than 2 characters and less then 10!');
            return;
        }

        updateProfile(loggedUser, {
            displayName: username
        });
        updateDoc(doc(database, 'users', loggedUser.uid), {
            username
        })
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                alert(err.message);
            })
    }


    return (
        <form className='auth' onSubmit={onEditUser}>
            <h3>Edit User</h3>
            <label htmlFor="username">Username</label>
            <input type="text" 
            placeholder="Username" 
            id="username" 
            name="username" 
            value={value.username} 
            onChange={(e) => setValue(state => ({...state, [e.target.name]: e.target.value}))} />
            <button type="submit">Edit</button>
        </form>
    );
}