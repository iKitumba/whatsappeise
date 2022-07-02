import { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import AddFriend from "./pages/AddFriend";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Register from "./pages/Register";

const MyRoutes = () => {
  const authData = useContext(AuthContext);
  const [loggedUser, setLoggedUser] = useState({});

  useEffect(() => {
    setLoggedUser(authData?.user);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={loggedUser ? <Main /> : <Navigate to="/login" />}
      />
      <Route
        path="/addfriend"
        element={loggedUser ? <AddFriend /> : <Navigate to="/login" />}
      />
      <Route
        path="/chats/:contact_id"
        element={loggedUser ? <Main /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={loggedUser ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={loggedUser ? <Register /> : <Navigate to="/" />}
      />
      <Route path="/*" element={<h1>Page not found 404</h1>} />
    </Routes>
  );
};

export default MyRoutes;
