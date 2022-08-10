import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { loadUser } from "./actions/userAction";
import store from "./store";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Dashboard from "./views/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import FixedPlugin from "./components/FixedPlugin/FixedPlugin";
import sidebarImage from "assets/img/sidebar-3.jpg";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import Footer from "./components/Footer/Footer";
import LoginSignUp from "./components/User/LoginSignUp";
import routes from "routes.js";
import UserProfile from "./views/UserProfile";
import TableList from "./views/TableList";
import UserList from "./views/User/UserList";
import UserUpdate from "./views/User/UserUpdate";
import Icons from "./views/Icons";
import CenterList from "./views/Center/CenterList";
import NewCenter from "./views/Center/newCenter";
import Courses from "./views/Courses/Courses";
import CreateCourse from "./views/Courses/CreateCourse";
import UpdateCourse from "./views/Courses/UpdateCourse";
import Class from "./views/Class/Class";
const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [color, setColor] = React.useState("black");
  const [image, setImage] = React.useState(sidebarImage);
  const [hasImage, setHasImage] = React.useState(true);
  const mainPanel = React.useRef(null);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <Router>
      {isAuthenticated}
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />

        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Switch>
              <Route exact path="/login" component={LoginSignUp} />
              <Route exact path="/" component={Dashboard} />
              <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/dashboard"
                component={Dashboard}
              />

              <ProtectedRoute
                exact
                path="/admin/user/:id"
                isAdmin={true}
                component={UserUpdate}
              />
              <ProtectedRoute
                exact
                path="/admin/icons"
                isAdmin={true}
                component={Icons}
              />
              <ProtectedRoute exact path="/admin/table" component={TableList} />
              <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/users"
                component={UserList}
              />
              <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/centers"
                component={CenterList}
              />
              <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/courses"
                component={Courses}
              />
              <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/createCourse"
                component={CreateCourse}
              />
              <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/course/:id"
                component={UpdateCourse}
              />
              <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/createCenter"
                component={NewCenter}
              />
              <ProtectedRoute
                // isAdmin={true}
                exact
                path="/admin/class"
                component={Class}
              />
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
      {/* <FixedPlugin
          hasImage={hasImage}
          setHasImage={() => setHasImage(!hasImage)}
          color={color}
          setColor={(color) => setColor(color)}
          image={image}
          setImage={(image) => setImage(image)}
        /> */}
      {/* {isAuthenticated && <UserOptions user={user} />} */}
    </Router>
  );
};

export default App;
