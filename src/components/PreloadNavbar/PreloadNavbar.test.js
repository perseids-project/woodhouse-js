import React from 'react';
import { render } from '@testing-library/react';

import PreloadNavbar from './PreloadNavbar';

it('renders without crashing', () => {
  const div = window.document.createElement('div');
  render(<PreloadNavbar />, div);
});
