import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const Register = () => {
    const { auth, onRegister } = useContext(AuthContext);

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

        onRegister(auth, email, password);
    }

    return (
        <form onSubmit={onSubmit}>
            <h3>Register Here</h3>
            <label htmlFor="email"></label>
            <input type="text" placeholder="Email" id="email" name="email" />
            <label htmlFor="password"></label>
            <input type="password" placeholder="Password" id="password" name="password" />
            <label htmlFor="repeatPassword"></label>
            <input type="password" placeholder="Repeat Password" id="repeatPassword" name="repeatPassword" />
            <button type="submit">Register</button>
        </form>
    );
}