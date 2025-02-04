import React from 'react';
import Barcosparavenda from '../frontoffice/barcosparavenda';
import './barcosvenda.css';
import Footer from '../footer/footer';
import Navbarfront from '../navs/Navfront';

const Barcosvenda = () => {
  return (
    <div>
    <div className="barcosvenda-page">
      <Navbarfront />
      <h1 className="my-4 display-4 px-4">Barcos para Venda</h1>
        <Barcosparavenda />
    </div>
    <Footer />
    </div>
  );
};

export default Barcosvenda;
