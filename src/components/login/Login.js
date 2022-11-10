import './login.css';

export const Login = () => {
    return (
        <form>
            <h3>Login Here</h3>
            <label htmlFor="email">Username</label>
            <input type="text" placeholder="Email" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" id="password" name="password" />
            <button>Log In</button>
        </form>
    );
}