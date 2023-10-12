import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axiosInstance from '../utils/axiosInstance'

const Home = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get(`/posts`);
                if (res.data && res.data.success) {
                    setPosts(res.data.data);
                }
            } catch (err) {
                console.log(err);
            }
        };

        return () => {
            fetchData();
        }
    }, []);

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
    };

    return (
        <div className="home">
            <div className="posts">
                {posts.length > 0 ? posts.map((post) => (
                    <div className="post" key={post.id}>
                        <div className="content">
                            <Link className="link" to={`/post/${post.id}`}>
                                <h1>{post.title}</h1>
                            </Link>
                            <p>{getText(post.content)}</p>
                            <Link className="link" to={`/post/${post.id}`}>
                                <button>Read More</button>
                            </Link>
                        </div>
                    </div>
                )) : <h4>[NO POSTS YET]</h4>}
            </div>
        </div>
    );
};

export default Home;
