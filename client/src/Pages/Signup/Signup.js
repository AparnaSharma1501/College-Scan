import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import "./Signup.css";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [error, setError] = useState(false);

  const formSubmitHandler = async e => {
    e.preventDefault();
    try {
      setError(false)
      const res = await axios.post("/auth/signup", {
        username,
        email,
        password
      });
      res.data && window.location.replace("/login")
    } catch (e) {
      setError(true)
    }


  };
  return (
    <>
      <div className="signup">
        <span className="signup-title">Signup</span>
        <form className="signup-form" onSubmit={formSubmitHandler}>
          <label>Username</label>
          <input
            className="signup-input"
            type="text"
            placeholder="Enter your username..."
            onChange={e => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            className="signup-input"
            type="email"
            placeholder="Enter your email..."
            onChange={e => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            className="signup-input"
            type="password"
            placeholder="Enter your password..."
            onChange={e => setPassword(e.target.value)}
          />
          <div className="btn">
            <button className="signup-btn" type="submit">
              Signup
            </button>
            <button className="login-btn">
              <Link className="link" to="/login">
                Login
              </Link>
            </button>
            {error && (<span style={{color:"red",marginTop:"10px"}}>Oops! Something went wrong :(</span>)}
          </div>
        </form>
      </div>
    </>
  );
};
export default Signup;
