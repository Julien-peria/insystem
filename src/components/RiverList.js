import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './../App.css';

const RiverList = () => {
  const [myArray, setMyArray] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState('45');
  const [newArray, setNewArray] = useState([]);
  const [selectedCommune, setSelectedCommune] = useState('');
  const [selectedCodeStation, setSelectedCodeStation] = useState(null); // Suivre le code de la station sélectionnée
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    api.get(`/station?code_departement=${selectedNumber}&pretty`)
      .then(response => {
        setMyArray(response.data.data);
        handleRowClick(response.data.data[0].code_station);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données de la rivière :', error);
      });
  }, [selectedNumber]);

  const handleRowClick = (codeStation) => {
    const url = `/chronique?code_station=${codeStation}&size=5&sort=${sortOrder}&pretty`;
    api.get(url)
      .then(response => {
        const sortedArray = response.data.data.sort((a, b) => {
          if (sortOrder === 'asc') {
            return a.resultat - b.resultat;
          } else {
            return b.resultat - a.resultat;
          }
        });
        setNewArray(sortedArray);
        setSelectedCommune(sortedArray[0].libelle_commune);
        setSelectedCodeStation(codeStation); // Définir le code de la station sélectionnée
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des nouvelles données :', error);
      });
  };

  const handleSortToggle = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    handleRowClick(myArray[0].code_station);
  };

  return (
    <div>
      <h2>Liste des stations</h2>
      <label htmlFor="departmentSelect">Sélectionnez un département :</label>
      <select
        id="departmentSelect"
        value={selectedNumber}
        onChange={(e) => setSelectedNumber(e.target.value)}
      >
        {Array.from({ length: 95 }, (_, index) => index + 1).map(number => (
          <option key={number} value={number.toString().padStart(2, '0')}>
            {number.toString().padStart(2, '0')}
          </option>
        ))}
      </select>

      <table className="river-table">
        <thead>
          <tr>
            <th>Libellé Commune</th>
            <th>Code Station</th>
            <th>Libellé Station</th>            
            <th>Code cours d'eau</th>
            <th>Code station</th>
          </tr>
        </thead>
        <tbody>
          {myArray.map(element => (
            <tr key={element.code_station} onClick={() => handleRowClick(element.code_station)} className={selectedCodeStation === element.code_station ? 'selected' : ''}>
            <td>{element.libelle_commune}</td>
              <td>{element.code_station}</td>
              <td>{element.libelle_station}</td>
              <td>{element.libelle_cours_eau}</td>
              <td>{element.code_station}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Cours d'eau de la commune de {selectedCommune}</h2>
      <table className="river-table">
        <thead>
          <tr>
            <th>Libellé Commune</th>
            <th>Code cours d'eau</th>
            <th onClick={handleSortToggle} className="clickable">Date de mesure
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/>
              </svg>
            </th>
            <th onClick={handleSortToggle} className="clickable">
              Température 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/>
              </svg>
            </th>
          </tr>
        </thead>
        <tbody>
          {newArray.map(element => (
            <tr key={element.id}>
              <td>{element.libelle_commune}</td>
              <td>{element.libelle_cours_eau}</td>
              <td>{element.date_mesure_temp} {element.heure_mesure_temp}</td>
              <td>{element.resultat.toFixed(3)}{element.symbole_unite}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiverList;
