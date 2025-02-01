import React from "react";
import "./profile.css";
import { useAuth0 } from "@auth0/auth0-react";
export const Profile = () => {
  const { user } = useAuth0();
  return (
    <div className="user-profile">
      <header className="user-header">
        <h1>Bienvenido, {user.given_name}</h1>
        <p>¡Nos alegra tenerte aquí!</p>
      </header>
      <div className="user-card">
        <img src={user.picture} alt="User Avatar" className="user-avatar" />
        <div className="user-info">
          <h2>{user.name}</h2>
          <p className="user-email">{user.email}</p>
          <p className="user-nickname">Apodo: {user.nickname}</p>
          <p className="user-updated">
            Última actualización: {new Date(user.updated_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};
