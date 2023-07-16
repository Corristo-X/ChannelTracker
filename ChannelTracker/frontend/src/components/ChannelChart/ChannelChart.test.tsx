import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import ChannelChart from './ChannelChart';
import '@testing-library/jest-dom/extend-expect';
const server = setupServer(
  rest.get('http://localhost:8000/api/channels', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([
      { id: 1, name: 'Test Channel 1', client_count: 10 },
      { id: 2, name: 'Test Channel 2', client_count: 20 },
    ]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ChannelChart', () => {
  it('renders correctly and fetches data from server', async () => {
    render(<ChannelChart />);
    await waitFor(() => {
      expect(screen.getByText('Test Channel 1 (10 - 33%)')).toBeInTheDocument();
      expect(screen.getByText('Test Channel 2 (20 - 67%)')).toBeInTheDocument();
    });
  });
});
