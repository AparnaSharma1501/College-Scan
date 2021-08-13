// import Header from "../../Components/Header/Header";
import SideBar from "../../Components/SideBar/SideBar";
import SinglePost from "../../Components/SinglePost/SinglePost";
import "./Single.css";
const Single = () => {
  return (
    <>
      <div className="single">
        {/*Post*/}
        <SinglePost />
        <SideBar />
      </div>
    </>
  );
};
export default Single;
