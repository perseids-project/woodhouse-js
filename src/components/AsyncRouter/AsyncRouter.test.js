import React from 'react';
import { render } from '@testing-library/react';

import AsyncRouter from './AsyncRouter';

it('renders without crashing', () => {
  const div = window.document.createElement('div');
  render(<AsyncRouter basename="/" />, div);
});
