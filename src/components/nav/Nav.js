export const Nav = () => {
    return (
        < nav
            id="scrollspy"
            className="navbar page-navbar navbar-light navbar-expand-md fixed-top"
            data-spy="affix"
            data-offset-top={20}
        >
            <div className="container">
                <a className="navbar-brand" href="#">
                    <strong className="text-primary">Ultimate</strong>{" "}
                    <span className="text-dark">Blog</span>
                </a>
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
                        <li className="nav-item">
                            <a className="nav-link" href="#home">
                                Login
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#about">
                                Register
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#features">
                                My Posts
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#testmonial">
                                Add Post
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#contact">
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    );
}