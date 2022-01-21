import { useState, useEffect } from "react";
import callToApi from "../services/api";
import "../style/App.scss";


function App() {
  const [adalabersData, setAdalabersData] = useState([]);
  const [inputChange, setInputChange] = useState("");
  const [name, setName] = useState("");
  const [counselor, setCounselor] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [selCouncelor, setSelCounselor] = useState("");
  const [redes, setRedes] = useState("");
  
// FETCH
  useEffect(() => {
    callToApi().then((response) => {
      setAdalabersData(response);
    });
  }, []);

// FILTER
  const handleFilter = (ev) => {
    setInputChange(ev.currentTarget.value);
  };

 const filterAdalaberData = adalabersData.filter((adalaber) => 
 adalaber.name.toLocaleLowerCase().includes(inputChange.toLowerCase())).filter((oneCounselor) => 
 oneCounselor.counselor.includes(selCouncelor));

 const selectCounselor = (ev) => {
   setSelCounselor(ev.currentTarget.value);
 }


//  RECOGER EL VALOR Y PINTAR 
  const handleName = (ev) => {
    setName(ev.currentTarget.value);
  };
  const handleCounselor = (ev) => {
    setCounselor(ev.currentTarget.value);
  };

  const handleSpeciality = (ev) => {
    setSpeciality(ev.currentTarget.value);
  };

 


  // AÑADIR ADALABER
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

  // SOCIAL-Networks
  const social = adalabersData.map((red) => (red.social_networks))
  console.log(social);

  return (
    <div className="App">
      
      <h1 className="title">Adalabers</h1>

      <form className="form">
      <label className="label" htmlFor="searchAdalaber">Nombre:</label>
      <input
      className="inputsearch"
      placeholder="Ej: MariCarmen"
        type="text"
        id="searchAdalaber"
        name="searchAdalaber"
        onChange={handleFilter}
        value={inputChange}
      />
       
        <label className="label" htmlFor="numberInput"
          >Escoge entre estas opciones:</label
        >
        <select
        className="inputsearch"
          name="counselor"
          id="counselor"
          onChange={selectCounselor}
          >
          <option defaultValue={selCouncelor} selected disabled>Escoge una tutora:</option>
          <option >Dayana</option>
          <option >Yanelis</option>
          <option >Iván</option>
        </select>
      </form>

      <table className='tabla'>
        <thead >
          <tr>
            <th className='tabla_el-container'>Nombre</th>
            <th className='tabla_el-container'>Tutora</th>
            <th className='tabla_el-container'>Especialidad</th>
            <th className='tabla_el-container'>Redes</th>
          </tr>
        </thead>
        <tbody >
          {filterAdalaberData.map((adalaber, index) => (
            <tr key={index}>
              <td className='tabla_el'>{adalaber.name}</td>
              <td className='tabla_el'>{adalaber.counselor}</td>
              <td className='tabla_el'>{adalaber.speciality}</td>
              <td className='tabla_el'> 
              {adalaber.social_networks.map((social_network) => 
                <a href={social_network.url}><i class={`fab fa-${social_network.name.toLowerCase()}`}></i></a>
              )}
              </td>
            </tr>
         ))}
        </tbody>
      </table>

      <h2 className="title">Añadir una Adalaber</h2>
      <label className="label_dos" htmlFor="name">Nombre:</label>
      <input
       className="inputsearch_dos"
        type="text"
        id="name"
        name="name"
        onChange={handleName}
        value={name}
      />
      <label className="label_dos" htmlFor="counselor">Tutora:</label>
      <input
       className="inputsearch_dos"
        type="text"
        id="counselor"
        name="counselor"
        onChange={handleCounselor}
        value={counselor}
      />
      <label className="label_dos" htmlFor="speciality">Especialidad:</label>
      <input
       className="inputsearch_dos"
        type="text"
        id="speciality"
        name="speciality"
        onChange={handleSpeciality}
        value={speciality}
      />
      <button className="btn" onClick={handleClick}>Añadir nueva Adalaber</button>
    </div>
  );
}

export default App;
