import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from './paginas/home';
import Barcosvenda from './paginas/barcosvenda';
import Paginalogin from './paginas/paginalogin';
import AddCliente from './backoffice/cliente2';
import EditarCliente from './backoffice/EditarCliente';
import EditarBarcos from './backoffice/EditarBarcos';
import ListaClientes from './backoffice/listaclientes';
import AdicionarBarco from './paginas/adicionarbarco';
import 'bootstrap/dist/css/bootstrap.min.css';
import Listavendas from './paginas/listadevendas';
import Login2 from './login/Login2';
import Paginalista from './paginas/paginalista';

const PrivateRoute = ({ element: Component }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Component />;
};

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login2 />}></Route>
          <Route path="/barcosvenda" element={<Barcosvenda />}></Route>
          <Route path="/clientes" element={<PrivateRoute element={AddCliente} />}></Route>
          <Route path="/editarcliente/:id" element={<PrivateRoute element={EditarCliente} />} />
          <Route path="/paginalista" element={<PrivateRoute element={Paginalista} />}></Route>
          <Route path="/adicionarbarco" element={<PrivateRoute element={AdicionarBarco} />}></Route>
          <Route path="/editarbarco/:id" element={<PrivateRoute element={EditarBarcos} />} />
          <Route path="/listavendas" element={<PrivateRoute element={Listavendas} />}></Route>
          <Route path="*" element={<h1>Not Found</h1>}></Route>
        </Routes>
    </BrowserRouter>
  );
};

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, <App />);
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}

export default App;
