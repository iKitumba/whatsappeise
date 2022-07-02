import { createContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    const userData = localStorage.getItem("user_data")
      ? JSON.parse(localStorage.getItem("user_data"))
      : {};

    setUser(userData);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = {
      [usernameRef.current.name]: usernameRef.current.value,
      [passwordRef.current.name]: passwordRef.current.value,
    };
    try {
      const response = await api.post("users/authenticate", userData);
      const { data } = response;

      localStorage.setItem("user_data", JSON.stringify(data));
      setUser(data);

      navigate("/", { replace: true });
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleLogOut = (e) => {
    e.preventDefault();

    localStorage.clear();
    setUser({});
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleLogin,
        handleLogOut,
        usernameRef,
        passwordRef,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
