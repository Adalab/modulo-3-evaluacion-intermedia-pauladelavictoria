import { useState, useEffect } from "react";
import callToApi from "../services/api";
import "../style/App.css";


function App() {
  const [adalabersData, setAdalabersData] = useState([]);
  const [name, setName] = useState("");
  const [counselor, setCounselor] = useState("");
  const [speciality, setSpeciality] = useState("");

  useEffect(() => {
    callToApi().then((response) => {
      setAdalabersData(response);
    });
  }, []);

  const handleName = (ev) => {
    setName(ev.currentTarget.value);
  };
  const handleCounselor = (ev) => {
    setCounselor(ev.currentTarget.value);
  };

  const handleSpeciality = (ev) => {
    setSpeciality(ev.currentTarget.value);
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    const newAdalaber = {
      name: name,
      counselor: counselor,
      speciality: speciality,
    };
    setAdalabersData([...adalabersData, newAdalaber]);
    setName("");
    setCounselor("");
    setSpeciality("");
  };

  return (
    <div className="App">
      <h1>Adalabers</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tutora</th>
            <th>Especialidad</th>
          </tr>
        </thead>
        <tbody>
          {adalabersData.map((adalaber, index) => (
            <tr key={index}>
              <td>{adalaber.name}</td>
              <td>{adalaber.counselor}</td>
              <td>{adalaber.speciality}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Añadir una Adalaber</h1>
      <label htmlFor="name">Nombre:</label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={handleName}
        value={name}
      />
      <label htmlFor="counselor">Tutora:</label>
      <input
        type="text"
        id="counselor"
        name="counselor"
        onChange={handleCounselor}
        value={counselor}
      />
      <label htmlFor="speciality">Especialidad:</label>
      <input
        type="text"
        id="speciality"
        name="speciality"
        onChange={handleSpeciality}
        value={speciality}
      />
      <button onClick={handleClick}>Añadir nueva Adalaber</button>
    </div>
  );
}

export default App;
