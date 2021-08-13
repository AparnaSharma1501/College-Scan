import "./SideBar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'

const SideBar = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sideBar">
      <div className="sideBar-item">
        <span className="sideBar-title">About Me</span>
        <img
          className="sideBar-img"
          src="https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
          alt="myImage"
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce purus
          augue, porta vestibulum dignissim at, commodo et lacus. Morbi aliquam
          turpis a bland!
        </p>
      </div>
      <div className="sideBar-item">
        <span className="sideBar-title">Categories</span>
        <ul className="sideBar-list">
          {cats.map(cat => (
            <Link to={`/?cat=${cat.name}`} className="link">
              <li className="sideBar-list-item">{cat.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sideBar-item">
        <span className="sideBar-title">Follow Us</span>
        <div className="sideBar-social">
          <i className="sideBar-icon fab fa-facebook" />
          <i className="sideBar-icon fab fa-twitter" />
          <i className="sideBar-icon fab fa-instagram" />
          <i className="sideBar-icon fab fa-linkedin-in" />
        </div>
      </div>
    </div>
  );
};
export default SideBar;
