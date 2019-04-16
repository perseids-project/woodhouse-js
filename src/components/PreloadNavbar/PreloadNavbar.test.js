import React from 'react';
import { render } from 'react-testing-library';

import PreloadNavbar from './PreloadNavbar';

it('renders without crashing', () => {
  const div = window.document.createElement('div');
  render(<PreloadNavbar />, div);
});
