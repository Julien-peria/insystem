// RiverCard.js
import React from 'react';

const RiverCard = ({ river }) => {
  return (
    <div>
      <h3>{river.name}</h3>
      {/* Afficher d'autres informations sur le cours d'eau */}
    </div>
  );
};

export default RiverCard;
