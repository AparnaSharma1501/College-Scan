import "./Post.css";
import { Link } from "react-router-dom";

const Post = props => {
const publicFolder = "http://localhost:3000/images/"
  return (
    <div className="post">
      {props.post.photo && (
        <img className="post-img" src={publicFolder+props.post.photo} alt="post_img" />
      )}
      <div className="post-info">
        <div className="post-cats">
          {props.post.categories.map(c => (
            <span className="post-cat">{c.name}</span>
          ))}
        </div>
        <Link to={`/post/${props.post._id}`} className="link">
          <span className="post-title">{props.post.title}</span>
        </Link>

        <hr />
        <span className="post-date">
          {new Date(props.post.createdAt).toDateString()}
        </span>
      </div>
      <p className="post-desc">{props.post.desc}</p>
    </div>
  );
};
export default Post;
