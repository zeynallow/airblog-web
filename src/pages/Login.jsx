import React, {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/authContext";

const Login = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const [err, setError] = useState(null);

    const navigate = useNavigate();

    const {login} = useContext(AuthContext);

    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(inputs).then(a => {
            navigate("/");
        }).catch(err => {
            setError(err.response.data.message);
        });
    };

    return (
        <div className="auth">
            <h1>[LOGIN]</h1>
            <form>
                <input
                    type="text"
                    placeholder="email"
                    name="email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Login</button>
                {err && <p>{err}</p>}
                <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
            </form>
        </div>
    );
};

export default Login;
