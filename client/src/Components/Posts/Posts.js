import "./Posts.css";
import Post from "../Post/Post";
const Posts = (props) => {
  return (
    <div className="posts">
    {props.posts.map(p => (
      <Post key={p._id} post={p}/>
    ))}

    </div>
  );
};
export default Posts;
