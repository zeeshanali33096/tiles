import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginForm from './index';

test('renders Login Form', () => {
  render(<LoginForm />);
  const linkElement = screen.getAllByPlaceholderText(/email/i);
//   const linkElement = screen.getByText(/learn react/i);
  expect(linkElement[0]).toBeInTheDocument();
});
