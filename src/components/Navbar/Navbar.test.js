import React from 'react';
import { render } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import Navbar from './Navbar';

it('renders without crashing', () => {
  const match = { params: { word: 'hello' } };

  const div = window.document.createElement('div');
  render(
    <MemoryRouter>
      <Navbar
        match={match}
      />
    </MemoryRouter>,
    div,
  );
});
