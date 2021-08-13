import "./Header.css";
const Header = () => {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitlesSm">React & Node</span>
        <span className="headerTitlesLg">Blog</span>
      </div>
      <img
        className="headerImg"
        src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80"
        alt="blogImg"
      />
    </div>
  );
};
export default Header;
