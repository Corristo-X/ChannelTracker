import React from 'react';
import { render, fireEvent, waitFor, getAllByLabelText } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom/extend-expect';
import ChannelList from './ChannelList';
import ChannelForm from '../ChannelForm/ChannelForm';

const server = setupServer(
  rest.get('http://localhost:8000/api/channels', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([
      { id: 1, name: 'Test Channel 1', client_count: 10 },
      { id: 2, name: 'Test Channel 2', client_count: 20 },
    ]));
  }),
  rest.delete('http://localhost:8000/api/channels/:id', (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.put('http://localhost:8000/api/channels/:id', (req, res, ctx) => {
  const channelId = req.params.id;
  const updatedChannel = req.body;


  return res(ctx.status(200), ctx.json(updatedChannel));
})

);


beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('ChannelList', () => {
  it('displays list of channels fetched from the server', async () => {
    const { findByText } = render(
      <MemoryRouter>
        <ChannelList />
      </MemoryRouter>
    );

    expect(await findByText('Test Channel 1')).toBeInTheDocument();
    expect(await findByText('Ilość klientów: 10')).toBeInTheDocument();
    expect(await findByText('Test Channel 2')).toBeInTheDocument();
    expect(await findByText('Ilość klientów: 20')).toBeInTheDocument();
  });

  it('deletes a channel when the delete button is clicked', async () => {
    const { findAllByText, queryByText } = render(
      <MemoryRouter>
        <ChannelList />
      </MemoryRouter>
    );

    const deleteButtons = await findAllByText('Usuń');
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(queryByText('Test Channel 1')).not.toBeInTheDocument();
    });
  });
  
});
