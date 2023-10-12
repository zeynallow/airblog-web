import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/authContext";

const Navbar = () => {
    const {currentUser, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    const logoutNavbar = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <a href="/">
                        [AIR BLOG]
                    </a>
                </div>

                {currentUser?.user ? (
                    <div className="links">
                        <span>{currentUser.user.name} <small>[{currentUser.user.email}]</small></span>
                        <button type="button" className="button" onClick={logoutNavbar}>Logout</button>
                        <Link className="button" to="/write">
                            Write
                        </Link>
                    </div>

                ) : (
                    <div className="links">
                        <Link className="button" to="/login">
                            Login
                        </Link>
                    </div>
                )}

        </div>
</div>
)
    ;
};

export default Navbar;
