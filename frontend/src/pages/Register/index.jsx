import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../services/api";

import lockIcon from "../../assets/lock.svg";
import smileIcon from "../../assets/smile.svg";
import uploadIcon from "../../assets/upload.svg";
import userIcon from "../../assets/username.svg";
import "./Register.css";

import whatsappeise from "../../assets/logo.svg";

export default function Register() {
  const [avatar, setAvatar] = useState(null);
  const [registerForm, setRegisterForm] = useState({
    username: "",
    bio: "",
    password: "",
    repeat: "",
  });

  const navigate = useNavigate();

  const token = !!localStorage.getItem("user_data")
    ? JSON.parse(localStorage.getItem("user_data"))
    : false;

  if (token) {
    navigate("/", { replace: true });
  }

  const preview = useMemo(() => {
    return avatar ? URL.createObjectURL(avatar) : null;
  }, [avatar]);

  const handleInputChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, bio, password, repeat } = registerForm;
    if (password !== repeat) {
      alert("As senhas não coecidem");
    } else if (username && bio && password && avatar) {
      const formData = new FormData();

      formData.append("username", username);
      formData.append("bio", bio);
      formData.append("password", password);
      formData.append("avatar", avatar);

      api
        .post("/users/register", formData)
        .then(({ data }) => {
          if (data.token) {
            localStorage.clear();
            localStorage.setItem("user_data", JSON.stringify(data));

            navigate("/", { replace: true });
          } else {
            alert(`Já existe um usário com este nome (${username})`);
          }
        })
        .catch((error) => {
          alert(`Já existe um usário com este nome (${username})`);
          console.log(error);
        });
    } else {
      alert("Por favor preencha todos os campos");
    }
  };

  return (
    <div className="register-container">
      <div className="register-info">
        <div className="logo-container">
          <img src={whatsappeise} alt="Logo" />
        </div>
        <h1>
          Registre se na nossa <br />
          rede social
        </h1>
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        <label
          className={`upload-area ${preview ? "has-preview" : ""}`}
          style={{ backgroundImage: `url(${preview})` }}
        >
          <div className="upload-info">
            <img src={uploadIcon} alt="Upload" />
            <p>avatar</p>
          </div>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </label>

        <label className="input-wrapper">
          <img src={userIcon} alt="Username" />
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={handleInputChange}
            value={registerForm.username}
          />
        </label>

        <label className="input-wrapper">
          <img src={smileIcon} alt="Bio" />
          <input
            type="text"
            name="bio"
            placeholder="bio"
            onChange={handleInputChange}
            value={registerForm.bio}
          />
        </label>

        <label className="input-wrapper">
          <img src={lockIcon} alt="Senha" />
          <input
            type="password"
            name="password"
            placeholder="senha"
            onChange={handleInputChange}
            value={registerForm.password}
          />
        </label>

        <label className="input-wrapper">
          <img src={lockIcon} alt="Repita senha" />
          <input
            type="password"
            name="repeat"
            placeholder="repita"
            onChange={handleInputChange}
            value={registerForm.repeat}
          />
        </label>

        <div className="already-have-account">
          <Link to="/login" style={{ textDecoration: "none" }}>
            <p>Já tenho uma conta</p>
          </Link>
        </div>

        <button type="submit" className="register-button">
          REGISTER
        </button>
      </form>
    </div>
  );
}
