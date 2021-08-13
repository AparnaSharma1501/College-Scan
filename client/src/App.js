import {useContext} from "react"
import TopBar from "./Components/TopBar/TopBar"
import Home from './Pages/Home/Home'
import Signup from "./Pages/Signup/Signup"
import Login from './Pages/Login/Login'
import Settings from './Pages/Settings/Settings'
import Write from './Pages/Write/Write'
import Single from './Pages/Single/Single'
import {Context} from "./context/Context"



import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
  const {user} = useContext(Context)
  return (
    <Router>
      <TopBar />
      <Switch>
      <Route exact path="/">
      <Home />
      </Route>
      <Route path="/signup">
      {(user)?<Home/>:<Signup />}
      </Route>
      <Route path="/login">
      {(user)?<Home/>:<Login />}
      </Route>
      <Route path="/settings">
      {(user)?<Settings/>:<Signup />}
      </Route>
      <Route path="/write">
      {(user)?<Write/>:<Signup />}
      </Route>
      <Route path="/post/:postId">
      <Single />
      </Route>
      </Switch>
    </Router>
  );
}

export default App;
