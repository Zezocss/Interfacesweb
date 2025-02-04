import React from 'react';
import AdicionarBarcoForm from '../backoffice/adicionarbarcoform';
import Footer from '../footer/footer';
import Navbaroffice from '../navs/Navback';

const AdicionarBarco = () => {
  return (
    <div className="adicionarbarco-page">
      <Navbaroffice />
      <div className="container">
        <AdicionarBarcoForm />
        <Footer />
      </div>
    </div>
  );
};

export default AdicionarBarco;
