import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddToOutfits from './AddToOutfits.jsx';

/**
 *  @jest-environment jsdom
 */

test('should render an add to outfits card', () => {
  const { getByText } = render(<AddToOutfits />);
  expect(getByText('Click here to add this to your outfits')).toBeInTheDocument();
});