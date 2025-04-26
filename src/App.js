import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navegacion from './components/Navegacion';
import ListarUsuario from './components/ListarUsuario';
import CrearUsuario from './components/CrearUsuario';

function App() {
  return (
    <>
      <Navegacion />
      <div className="container p-4">
        <Routes>
          <Route path="/" element={<ListarUsuario />} />
          <Route path="/CrearUsuario" element={<CrearUsuario />} />
          <Route path="/edit/:id" element={<CrearUsuario />} />
        </Routes>
      </div>
    </>
  );
}

export default App;