import React, { Component } from 'react';
import Header from './Componentes/Header';
import AgregarCita from './Componentes/AgregarCita';
import ListaCitas from './Componentes/ListaCitas';

// Redux
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header
            titulo={'Administrador de Pacientes veterinaria'} />
          <div className="row margenes">
            <div className="col-md-6">
              <AgregarCita />
            </div>
            <div className="col-md-6">
              <ListaCitas />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
