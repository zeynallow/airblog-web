import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Register = () => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [err, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post("/auth/sign-up", inputs);
            navigate("/login");
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <div className="auth">
            <h1>[REGISTER]</h1>
            <form>
                <input
                    required
                    type="text"
                    placeholder="name"
                    name="name"
                    onChange={handleChange}
                />
                <input
                    required
                    type="email"
                    placeholder="email"
                    name="email"
                    onChange={handleChange}
                />
                <input
                    required
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Register</button>
                {" "}
                {err && <p>{err}</p>}
                <span>
          Do you have an account? <Link to="/login">Login</Link>{" "}
        </span>
            </form>
        </div>
    );
};

export default Register;
