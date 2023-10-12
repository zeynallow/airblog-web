import React, {useContext, useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import moment from "moment";
import {AuthContext} from "../context/authContext";
import axiosInstance from '../utils/axiosInstance'

const Single = () => {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const [comment, setComment] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    const postId = location.pathname.split("/")[2];

    const {currentUser} = useContext(AuthContext);

    const fetchData = async () => {
        try {
            const res = await axiosInstance.get(`/post/${postId}`);
            if (res.data && res.data.success) {
                setPost(res.data.data);
            }
        } catch (err) {
            alert(err.response.data.message)
        }
    };

    const fetchComments = async () => {
        try {
            const res = await axiosInstance.get(`/post/${postId}/comments`);
            if (res.data && res.data.success) {
                setComments(res.data.data);
            }
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {

        return () => {
            fetchData();
            fetchComments();
        }
    }, [postId]);

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/post/${postId}`);
            navigate("/");
        } catch (err) {
            alert(err.response.data.message)
        }
    };

    const handleCommentDelete = async (commentId) => {
        try {
            await axiosInstance.delete(`/comments/${commentId}`).then(s => {
                fetchComments()
            });

        } catch (err) {
            alert(err.response.data.message)
        }
    };

    const handleComment = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post(`/post/${postId}/comments`, {
                comment
            });
            setComment("")
            fetchComments()
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
    };

    return (
        <div className="single">
            <div className="content">
                <div className="user">
                    <div className="info">
                        {post.user && <span>{post.user.name} [{post.user.email}]</span>}
                        <p>Posted {moment(post.created_at).fromNow()}</p>
                    </div>
                    {currentUser?.user?.id === post?.user?.id && (
                        <div className="edit">
                            <Link to={`/write?edit=2`} state={post} className="button">
                                Edit
                            </Link>
                            <button onClick={handleDelete} className="button" type="button">
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                <h1>{post.title}</h1>
                <i>"{getText(post.content)}"</i>
            </div>

            <div className="content">
                <h4>[COMMENTS]</h4>
                <div className="comments">
                    {comments.map((comment) => (
                        <div className="comment" key={comment.id}>
                            <span>[{comment.user?.name}]
                                {currentUser?.user?.id === comment?.user?.id && (
                                    <div>
                                        <button onClick={(e) => handleCommentDelete(comment.id)}
                                                className="button-sm"
                                                type="button">
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </span>
                            <small>{moment(comment.created_at).fromNow()}</small>
                            <p>{comment.comment}</p>
                        </div>
                    ))}

                </div>

                <div className="write-comment">
                    <input
                        type="text"
                        placeholder="Write comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="button" onClick={handleComment} type="button">Send</button>

                </div>
            </div>

        </div>
    );
};

export default Single;
