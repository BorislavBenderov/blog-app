import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";

export const Nav = () => {
    const { auth, loggedUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const onLogout = () => {
        signOut(auth).then(() => {
            navigate('/');
        }).catch((err) => {
            alert(err.message);
        });
    }

    return (
        < nav
            id="scrollspy"
            className="navbar page-navbar navbar-light navbar-expand-md fixed-top"
            data-spy="affix"
            data-offset-top={20}
        >
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <strong className="text-primary">Ultimate</strong>
                    <span className="text-dark">Blog</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        {!loggedUser
                            ? <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        Register
                                    </Link>
                                </li>
                            </>
                            : <>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/'>
                                        {loggedUser.email}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/myposts">
                                        My Posts
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/create">
                                        Add Post
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/" onClick={onLogout}>
                                        Logout
                                    </Link>
                                </li>
                            </>}
                    </ul>
                </div>
            </div>
        </nav >
    );
}