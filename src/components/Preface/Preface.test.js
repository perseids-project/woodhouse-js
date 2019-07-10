import React from 'react';
import { render } from '@testing-library/react';

import Preface from './Preface';

it('renders without crashing', () => {
  const div = window.document.createElement('div');
  render(<Preface />, div);
});
