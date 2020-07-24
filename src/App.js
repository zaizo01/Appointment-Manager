import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';



function App() {

  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

  const [citas, guardarCitas] = useState(citasIniciales);

  useEffect(() => {
    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    }
    else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales]);

  const crearCita = cita => { guardarCitas([...citas, cita]); }

  const eliminarCitas = id => {
    const nuevaCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevaCitas);
  }

  const titulo = citas.length === 0 ? 'No hay citas' : 'Listado de Citas';

  return (
    <Fragment>

    <h1>Administrador de Pacientes</h1>
    <div className="container">
      <div className="row">
      <div className="one-half column">
        <Formulario
        crearCita={crearCita}
        />
      </div>
      <div className="one-half column">
      <h2>{titulo}</h2>
      {citas.map(cita => (
      <Cita
      key={cita.id}
      cita={cita}
      eliminarCitas={eliminarCitas}
      />
      ))}
      </div>
      </div>
    </div>
    </Fragment>
  );
}

export default App;
