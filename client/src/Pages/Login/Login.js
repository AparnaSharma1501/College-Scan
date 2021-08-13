import {Link} from 'react-router-dom'
import axios from "axios"
import {useContext,useRef} from "react"
import {Context} from "../../context/Context"
import "./Login.css";

const Login = () => {
  const userRef = useRef()
  const passwordRef = useRef()
const {dispatch,isFetching} = useContext(Context)

  const formSubmitHandler = async (e)=>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"})
    try {
      const res= await axios.post("/auth/login",{
        username:userRef.current.value,
        password:passwordRef.current.value
      })
      dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    } catch (e) {
      dispatch({type:"LOGIN_FAILURE"})
    }
  }

  return (
    <>
      <div className="login">
      <span className="login-title">Login</span>
        <form className="login-form" onSubmit={formSubmitHandler}>
        <label>Username</label>
        <input className="login-input" type="text" placeholder="Enter your username..."  ref={userRef} />
        <label>Password</label>
        <input className="login-input" type="password" placeholder="Enter your password..." ref={passwordRef} />
        <div className="btn"><button className="login-btn" type="submit" disabled={isFetching}>Login</button>
        <button className="signup-btn"><Link className="link" to="/signup">Signup</Link></button></div>
        </form>

      </div>
    </>
  );
};
export default Login;
