import {useContext} from "react"
import { Link } from "react-router-dom";
import "./TopBar.css";
import {Context} from "../../context/Context"

const TopBar = () => {
  const {user,dispatch} = useContext(Context)
  const publicFolder="http://localhost:3000/images/"

const logoutHandler =()=>{
  dispatch({type:"LOGOUT"})
}

  return (
    <div className="top">
      <div className="top-left">
        <i className="topIcon fab fa-facebook" />
        <i className="topIcon fab fa-twitter" />
        <i className="topIcon fab fa-instagram" />
        <i className="topIcon fab fa-linkedin-in" />
      </div>
      <div className="top-center">
        <ul className="topList">
          <li className="topList-items">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topList-items">
            <Link className="link" to="/">
              ABOUT
            </Link>
          </li>
          <li className="topList-items">
            <Link className="link" to="/">
              CONTACT
            </Link>
          </li>
          <li className="topList-items">
            <Link className="link" to="/write">
              PEN
            </Link>
          </li>
          <li className="topList-items" onClick={logoutHandler}>{user && "LOGOUT"}</li>
        </ul>
      </div>
      <div className="top-right">

        {user ? (
          <Link to="/settings">
          <img
            className="topImg"
            src={publicFolder+user.profilePic}
            alt="ProfileImg"
          />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topList-items">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topList-items">
              <Link className="link" to="/signup">
                SIGNUP
              </Link>
            </li>
          </ul>
        )}

        <i className="topSearchIcon fas fa-search" />
      </div>
    </div>
  );
};
export default TopBar;
