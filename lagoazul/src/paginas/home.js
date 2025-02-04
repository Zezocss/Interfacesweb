import React from 'react';
import Navbarfront from '../navs/Navfront';
import '../navs/Navfront.css';
import paisagem from '../image/paisagem1.png';
import Footer from '../footer/footer';

const Home = () => {
  return (
    <div className="home-page">
      <Navbarfront />
      <div className="hero-section text-center text-black d-flex align-items-center justify-content-center" style={{
        backgroundImage: `url(${paisagem})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "70vh"
      }}>
        <div className="bg-white bg-opacity-50 p-5 rounded">
          <h1 className="display-4">Clube Náutico do Lago Azul</h1>
          <p className="lead">O destino perfeito para os amantes do lazer nautico.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;



