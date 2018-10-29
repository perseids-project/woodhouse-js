import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AsyncLookup from './AsyncLookup';
import Footer from './Footer';

const App = () => (
  <React.Fragment>
    <div className="container text-center">
      <header>
        <h1 className="h3 pt-4 mb-1 font-weight-normal">
          Woodhouse English-Greek Dictionary (beta)
        </h1>
        <h5 className="h5 mb-3 font-weight-normal">
          Type a word below
        </h5>
      </header>
      <main>
        <div className="mb-4">
          <Router basename={process.env.PUBLIC_URL}>
            <Route path="/:word?" component={AsyncLookup} />
          </Router>
        </div>
      </main>
    </div>
    <footer>
      <Footer />
    </footer>
  </React.Fragment>
);

export default App;
