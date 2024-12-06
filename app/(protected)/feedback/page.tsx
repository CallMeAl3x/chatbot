"use client";

import React, { useState } from "react";

const FeedbackPage: React.FC = () => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de soumission du formulaire
    console.log("Subject:", subject);
    console.log("Content:", content);
    setShowPopup(true); // Affiche la popup
  };

  const closePopup = () => {
    setShowPopup(false); // Ferme la popup
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full p-8 bg-white rounded-lg shadow-lg mb-4">
        <h1 className="text-3xl font-bold text-center text-black mb-6">
          Envoyez votre Feedback
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Champ Sujet */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-1">
              Sujet :
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              placeholder="Entrez le sujet"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Champ Contenu */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1">
              Contenu :
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Entrez votre message ici..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Bouton Envoyer */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-400 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Envoyer
          </button>
        </form>
      </div>

      {/* Popup de confirmation */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999]">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Merci !
            </h2>
            <p className="text-gray-600">
              Votre feedback a bien été pris en compte.
            </p>
            <button
              onClick={closePopup}
              className="mt-6 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;
