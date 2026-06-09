import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Nav from './Nav';

const renderNav = () =>
  render(
    <MemoryRouter>
      <Nav />
    </MemoryRouter>
  );

test('renders the Home link', () => {
  renderNav();
  const homeLink = screen.getByText('Home');
  expect(homeLink).toBeInTheDocument();
  expect(homeLink.getAttribute('href')).toBe('/');
});

test('renders the Tweets link', () => {
  renderNav();
  const tweetsLink = screen.getByText('Tweets');
  expect(tweetsLink).toBeInTheDocument();
  expect(tweetsLink.getAttribute('href')).toBe('/tweets');
});

test('renders a navbar element', () => {
  const { container } = renderNav();
  expect(container.querySelector('nav.navbar')).toBeInTheDocument();
});

test('renders the toggle button for mobile', () => {
  renderNav();
  const toggleBtn = screen.getByLabelText('Toggle navigation');
  expect(toggleBtn).toBeInTheDocument();
});

test('Home link has active class', () => {
  renderNav();
  const homeLink = screen.getByText('Home');
  expect(homeLink).toHaveClass('active');
});
