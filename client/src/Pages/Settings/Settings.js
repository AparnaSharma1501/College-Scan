import {useContext,useState} from "react";
import "./Settings.css";
import SideBar from "../../Components/SideBar/SideBar";
import {Context} from "../../context/Context"
import axios from "axios"

const Settings = () => {
  const [file,setFile] =useState(null)
  const [username,setUsername] =useState("")
  const [email,setEmail] =useState("")
  const [password,setPassword] =useState("")
const [updateSuccess,setUpdateSuccess]=useState(false)

  const {user,dispatch} =useContext(Context);

  const publicFolder ="http://localhost:3000/images/"

  const submitHandler = async (e) =>{
    e.preventDefault()
    dispatch({type:"UPDATE_START"})
    const updatedUser = {
      userId:user._id ,
      username,
      email,
      password
    }
    if(file)
    {
      const data =new FormData()
      const filename = Date.now()+file.name;
      data.append("name",filename)
      data.append("file",file)
      updatedUser.profilePic =filename
      try {
        await axios.post("/upload",data)

      } catch (e) {}
    }
    try {
     const res = await axios.patch("/users/"+user._id, updatedUser)
     setUpdateSuccess(true)
     dispatch({type:"UPDATE_SUCCESS", payload:res.data})
    } catch (e) {
      dispatch({type:"UPDATE_FAILURE"})
    }

  }

  return (
    <div className="settings">
      <div className="settings-wrapper">
        <div className="settings-title">
          <span className="settings-updateTitle">Update Your Account</span>
          <span className="settings-deleteTitle">Delete Acoount</span>
        </div>
        <form className="settings-form" onSubmit={submitHandler}>
          <label>Profile Picture</label>
          <div className="settings-PP">
            <img
              src={file ? URL.createObjectURL(file) : publicFolder+user.profilePic}
              alt="Profile-img"
            />
            <label htmlFor="fileInput">
              <i className="settings-PP-icon fas fa-user-circle" />
            </label>
            <input type="file" id="fileInput" onChange={(e)=>setFile(e.target.files[0])}/>
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.username} onChange={(e)=>setUsername(e.target.value)}/>
          <label>Email</label>
          <input type="email" placeholder={user.email} onChange={(e)=>setEmail(e.target.value)}/>
          <label>Password</label>
          <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
          <button className="settings-submit" type="submit">Update</button>
          {updateSuccess && <span style={{color:"green",textAlign:"center",marginTop:"20px"}}>Profile has been updated successfully...</span>}
        </form>
      </div>
      <SideBar />
    </div>
  );
};

export default Settings;
