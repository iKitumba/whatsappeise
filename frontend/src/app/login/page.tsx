"use client";
import { useContext } from "react";

import { LockIcon, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../contexts/AuthContext";

export default function Login() {
  const authContext = useContext(AuthContext);
  const { handleLogin, usernameRef, passwordRef } = authContext;

  const router = useRouter();
  const token = !!localStorage.getItem("user_data")
    ? JSON.parse(localStorage.getItem("user_data"))
    : false;

  if (token) {
    router.push("/");
  }

  return (
    <div className="login-container">
      <div className="login-info">
        <div className="">
          <Image width={240} height={60} src={"/logo.svg"} alt="Logo" />
        </div>
        <h1 className="text-zinc-800">
          Faça seu login na <br />
          nossa rede social
        </h1>
      </div>
      <form className="login-form max-w-[430px] mx-auto" onSubmit={handleLogin}>
        <label className="login-input-wrapper">
          <User2 size={24} />
          <input
            type="text"
            name="username"
            placeholder="username"
            required
            ref={usernameRef}
          />
        </label>

        <label className="login-input-wrapper">
          <LockIcon size={24} />
          <input
            type="password"
            name="password"
            placeholder="senha"
            ref={passwordRef}
            required
          />
        </label>

        <div className="dont-have-account">
          <Link href="/register" style={{ textDecoration: "none" }}>
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
