import React from 'react';
import Footer from '../footer/footer';
import Navbaroffice from '../navs/Navback';
import BarcosParaVendaBackoffice from '../backoffice/barcosparavenda';

const Listavendas = () => {
  return (
    <div className="adicionarbarco-page">
      <Navbaroffice />
      <h1 className="my-4 display-4 px-4">Barcos para Venda (Backoffice)</h1>
      <div className="container">
        <BarcosParaVendaBackoffice />
      </div>
    </div>
  );
};

export default Listavendas;