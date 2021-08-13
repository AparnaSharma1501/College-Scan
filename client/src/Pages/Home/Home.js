import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Header from "../../Components/Header/Header";
import SideBar from "../../Components/SideBar/SideBar";
import Posts from "../../Components/Posts/Posts";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(
    () => {
      const fetchPosts = async () => {
        const res = await axios.get("/posts" + search);
        setPosts(res.data);
      };
      fetchPosts();
    },
    [search]
  );
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <SideBar />
      </div>
    </>
  );
};
export default Home;
