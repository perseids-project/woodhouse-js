import React from 'react';
import { PerseidsFooter } from 'perseids-react-components';

import 'perseids-react-components/build/css/index.css';

import AsyncRouter from '../AsyncRouter/AsyncRouter';

const App = () => (
  <>
    <AsyncRouter basename={process.env.PUBLIC_URL} />
    <PerseidsFooter
      github="https://github.com/perseids-project/woodhouse-js"
      report="https://github.com/perseids-project/woodhouse-js/issues"
      doi="10.5281/zenodo.3967885"
    />
  </>
);

export default App;
