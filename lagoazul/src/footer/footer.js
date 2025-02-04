import React from 'react';
import instagram from '../image/instagram.png';
import facebook from '../image/facebook.png';

const Footer = () => {
  return (
    <footer className="footer bg-light py-1"> {}
      <div className="container text-center">
        <p style={{ color: 'black' }}> 2023 Lagoazul. All rights reserved.</p>
        <nav className="footer-nav d-flex justify-content-center">
          <a href="https://www.instagram.com/lagoazul_clubenautico" target="_blank" rel="noopener noreferrer" className="mx-2">
            <img src={instagram} alt="Instagram" className="footer-icon" style={{ width: '24px', height: '24px' }} />
          </a>
          <a href="https://www.facebook.com/centronauticocastelobode" target="_blank" rel="noopener noreferrer" className="mx-2">
            <img src={facebook} alt="Facebook" className="footer-icon" style={{ width: '24px', height: '24px' }} />
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
