import React from 'react';
import { render } from 'react-testing-library';

import AsyncRouter from './AsyncRouter';

it('renders without crashing', () => {
  const div = window.document.createElement('div');
  render(<AsyncRouter />, div);
});
