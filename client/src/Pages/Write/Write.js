// import Header from "../../Components/Header/Header";
// import SideBar from "../../Components/SideBar/SideBar";
// import Posts from "../../Components/Posts/Posts";
import "./Write.css";
import {useState,useContext} from "react"
import axios from "axios"
import {Context} from "../../context/Context"


const Write = () => {
const [title,setTitle] = useState("")
const [desc,setDesc] =useState("")
const [file,setFile] =useState(null)
const {user} = useContext(Context)

const submitHandler = async (e) =>{
  e.preventDefault()
  const newPost = {
    username:user.username,
    title,
    desc
  }
  if(file)
  {
    const data =new FormData()
    const filename = Date.now()+file.name;
    data.append("name",filename)
    data.append("file",file)
    newPost.photo =filename
    try {
      await axios.post("/upload",data)
    } catch (e) {}
  }
  try {
    const res = await axios.post("/posts",newPost)
    //console.log(res.data.username);
    window.location.replace("/?user="+res.data.username)
  } catch (e) {}

}

  return (
    <>
      <div className="write">
      {file && (
        <img
          className="write-img"
          src={URL.createObjectURL(file)}
          alt="post-img"
        />)}
        <form className="write-form" onSubmit={submitHandler}>
          <div className="write-form-group">
            <label htmlFor="file-input">
              <i className="write-icon fas fa-plus" />
            </label>
            <input type="file" id="file-input" onChange={(e)=>setFile(e.target.files[0])} />
            <input
              type="text"
              placeholder="Title"
              className="write-input"
              autoFocus={true}
              onChange={e=>setTitle(e.target.value)}
            />
          </div>
            <div className="write-form-group">
              <textarea
                className="write-input write-text"
                placeholder="Tell your story..."
                type="text"
                onChange={e=>setDesc(e.target.value)}
              />
            </div>
            <button className="write-submit" type="submit">Publish</button>
          </form>
      </div>
    </>
  );
};
export default Write;
