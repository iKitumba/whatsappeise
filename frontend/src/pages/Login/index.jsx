import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import lockIcon from "../../assets/lock.svg";
import userIcon from "../../assets/username.svg";

import whatsappeise from "../../assets/logo.svg";

import "./Login.css";

import { AuthContext } from "../../contexts/AuthContext";

export default function Login() {
  const authContext = useContext(AuthContext);
  const { handleLogin, usernameRef, passwordRef } = authContext;

  const navigate = useNavigate();
  const token = !!localStorage.getItem("user_data")
    ? JSON.parse(localStorage.getItem("user_data"))
    : false;

  if (token) {
    navigate("/", { replace: true });
  }

  return (
    <div className="login-container">
      <div className="login-info">
        <div className="logo-container">
          <img src={whatsappeise} alt="Logo" />
        </div>
        <h1>
          Faça seu login na <br />
          nossa rede social
        </h1>
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <label className="login-input-wrapper">
          <img src={userIcon} alt="User" />
          <input
            type="text"
            name="username"
            placeholder="username"
            required
            ref={usernameRef}
          />
        </label>

        <label className="login-input-wrapper">
          <img src={lockIcon} alt="Senha" />
          <input
            type="password"
            name="password"
            placeholder="senha"
            ref={passwordRef}
            required
          />
        </label>

        <div className="dont-have-account">
          <Link to="/register" style={{ textDecoration: "none" }}>
            <p>Não tenho uma conta</p>
          </Link>
        </div>

        <button type="submit" className="login-button">
          ENTRAR
        </button>
      </form>
    </div>
  );
}
