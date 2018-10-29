import React from 'react';

import './Footer.css';

const Footer = () => (
  <div className="footer text-center bg-light">
    <div className="container">
      <span className="text-muted">
        <a href="https://github.com/perseids-project/woodhouse-js" target="_blank" rel="noopener noreferrer">
          About
        </a>
        {' '}
        &bull;
        {' '}
        <a href="https://github.com/perseids-project/woodhouse-js/issues" target="_blank" rel="noopener noreferrer">
          Issues
        </a>
        {' '}
        &bull;
        {' '}
        <a href="http://www.perseids.org/" target="_blank" rel="noopener noreferrer">
          Perseids
        </a>
      </span>
      <br />
    </div>
  </div>
);

export default Footer;
