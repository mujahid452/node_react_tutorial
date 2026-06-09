import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders the welcome heading', () => {
  render(<Home />);
  expect(screen.getByText('Welcome')).toBeInTheDocument();
});

test('renders the description paragraph', () => {
  render(<Home />);
  expect(
    screen.getByText('This site was created using Node JS and React.')
  ).toBeInTheDocument();
});

test('renders inside a section element', () => {
  const { container } = render(<Home />);
  expect(container.querySelector('section')).toBeInTheDocument();
});

test('renders a container-fluid div', () => {
  const { container } = render(<Home />);
  expect(container.querySelector('.container-fluid')).toBeInTheDocument();
});
