import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the navigation bar', () => {
  render(<App />);
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Tweets')).toBeInTheDocument();
});

test('renders the Home component by default', () => {
  render(<App />);
  expect(screen.getByText('Welcome')).toBeInTheDocument();
  expect(screen.getByText(/This site was created using Node JS and React/i)).toBeInTheDocument();
});

test('wraps content in a div with App class', () => {
  const { container } = render(<App />);
  expect(container.querySelector('.App')).toBeInTheDocument();
});
