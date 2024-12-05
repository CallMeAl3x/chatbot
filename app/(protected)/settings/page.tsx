"use client";

import React, { useState } from "react";

const Settings = () => {

  // État local pour stocker les informations de l'utilisateur
  const [user, setUser] = useState({
    firstName: "TODO", // Valeur initiale
    email: "TODO", // Valeur initiale
  });

  // Gestion des changements dans les champs de formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value, // Met à jour dynamiquement la valeur
    }));
  };

  // Gestion de la soumission (simulée ici)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Informations mises à jour :", user);
    alert("Les informations ont été mises à jour !");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Paramètres utilisateur</h2>
      <form onSubmit={handleSubmit}>
        {/* Champ pour le prénom */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="firstName" style={{ display: "block", marginBottom: "5px" }}>
            Prénom :
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            required
          />
        </div>

        {/* Champ pour l'email */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>
            Email :
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            required
          />
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default Settings;
