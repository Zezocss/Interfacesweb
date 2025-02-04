import React from "react";
import ListaClientes from "../backoffice/listaclientes";
import Navbaroffice from "../navs/Navback";

const Paginalista = () => {
    return (
        <div>
            <Navbaroffice />
            <div className="listaclientes-page px-4">
                <h1 className="my-4 display-4">Lista de Clientes</h1>
            </div>
            <ListaClientes />
        </div>
    )
};
export default Paginalista;