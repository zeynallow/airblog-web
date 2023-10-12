import React, {useState} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {useLocation, useNavigate} from "react-router-dom";

import axiosInstance from '../utils/axiosInstance'

const Write = () => {
    const state = useLocation().state;

    const [title, setTitle] = useState(state?.title || "");
    const [value, setValue] = useState(state?.content || "");
    const [err, setError] = useState(null);
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            state
                ? await axiosInstance.put(`/post/${state.id}`, {
                    title,
                    content: value
                })
                : await axiosInstance.post(`/post/create`, {
                    title,
                    content: value
                });
            navigate("/");
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <div className="add">
            <div className="content">
                {state ? <h1>[EDIT POST]</h1> : <h1>[CREATE POST]</h1>}

                {err && <p className="error-text">{err}</p>}
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="editor-container">
                    <ReactQuill
                        className="editor"
                        theme="snow"
                        value={value}
                        onChange={setValue}
                    />
                </div>

                <div className="buttons">
                    <button className="button" onClick={handleClick}>Publish</button>
                </div>
            </div>
        </div>
    );
};

export default Write;