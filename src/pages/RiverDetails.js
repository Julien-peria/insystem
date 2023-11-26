// RiverDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const RiverDetails = () => {
  const { id } = useParams();

  // Faire une requête à l'API pour obtenir les détails du cours d'eau avec l'ID spécifié

  return (
    <div>
      <h1>Details du cours d'eau {id}</h1>
      {/* Afficher les détails du cours d'eau ici */}
    </div>
  );
};

export default RiverDetails;
