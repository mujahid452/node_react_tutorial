import { render, screen, waitFor } from '@testing-library/react';
import Tweet from './Tweet';

const mockTweets = [
  { name: 'Alice', msg: 'Hello world!', username: 'alice' },
  { name: 'Bob', msg: 'Testing is fun', username: 'bob' },
];

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockTweets),
    })
  );
});

afterEach(() => {
  global.fetch.mockRestore();
});

test('calls fetch on /tweets when mounted', async () => {
  render(<Tweet />);
  await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('/tweets'));
});

test('renders tweet names after fetch resolves', async () => {
  render(<Tweet />);
  expect(await screen.findByText('Alice')).toBeInTheDocument();
  expect(screen.getByText('Bob')).toBeInTheDocument();
});

test('renders tweet messages', async () => {
  render(<Tweet />);
  expect(await screen.findByText('Hello world!')).toBeInTheDocument();
  expect(screen.getByText('Testing is fun')).toBeInTheDocument();
});

test('renders tweet usernames with "by" prefix', async () => {
  render(<Tweet />);
  expect(await screen.findByText(/by alice/i)).toBeInTheDocument();
  expect(screen.getByText(/by bob/i)).toBeInTheDocument();
});

test('renders a card for each tweet', async () => {
  const { container } = render(<Tweet />);
  await screen.findByText('Alice');
  const cards = container.querySelectorAll('.card');
  expect(cards).toHaveLength(mockTweets.length);
});

test('renders empty when fetch returns no items', async () => {
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({ json: () => Promise.resolve([]) })
  );
  const { container } = render(<Tweet />);
  await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  expect(container.querySelectorAll('.card')).toHaveLength(0);
});
