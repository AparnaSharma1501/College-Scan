import { useLocation } from "react-router";
import { useEffect, useState, useContext } from "react";
import "./SinglePost.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";

const SinglePost = () => {
  const location = useLocation();
  //storing postid in path
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const publicFolder = "http://localhost:3000/images/";
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(
    () => {
      const getPost = async () => {
        const res = await axios.get("/posts/" + path);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
      };
      getPost();
    },
    [path]
  );

  const deletePostHandler = async () => {
    try {
      await axios.delete("/posts/" + path, {
        data: { username: user.username }
      });
      window.location.replace("/");
    } catch (e) {}
  };

  const updateHandler = async () => {
    try {
      await axios.patch("/posts/" + path, {
        username: user.username,
        title,
        desc
      });
      // window.location.reload();
      setUpdateMode(false);
    } catch (e) {}
  };

  return (
    <>
      <div className="singlePost">
        <div className="singlePost-wrapper">
          {post.photo && (
            <img
              className="singlePost-wrapper-img"
              src={publicFolder + post.photo}
              alt="post-img"
            />
          )}
          {updateMode ? (
            <input
              className="singlePost-title-input"
              type="text"
              value={title}
              autoFocus
              onChange={e => setTitle(e.target.value)}
            />
          ) : (
            <h1 className="singlePost-title">
              {title}
              {post.username === user?.username && (
                <div className="singlePost-edit">
                  <i
                    className="singlePost-icon fas fa-pen-alt"
                    onClick={() => setUpdateMode(true)}
                  />
                  <i
                    className="singlePost-icon fas fa-trash-alt"
                    onClick={deletePostHandler}
                  />
                </div>
              )}
            </h1>
          )}
          <div className="singlePost-info">
            <span className="singlePost-author">
              Author:
              <Link to={`/?user=${post.username}`} className="link">
                {" "}
                <em>{post.username}</em>
              </Link>
            </span>
            <span className="singlePost-date">
              Date: {new Date(post.createdAt).toDateString()}
            </span>
          </div>
          {updateMode ? (
            <textarea
              className="singlePost-desc-input"
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
          ) : (
            <p className="singlePost-desc">{desc}</p>
          )}
          {updateMode && (
            <button className="singlePost-btn" onClick={updateHandler}>
              Update
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default SinglePost;
