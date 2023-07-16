import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { setupServer } from 'msw/node';
import ChannelForm from './ChannelForm';

const server = setupServer(
  rest.post<any, any>('http://localhost:8000/api/channels', (req, res, ctx) => {
    const { name, client_count } = req.body;
    const newChannel = {
      id: 1,
      name,
      client_count,
    };
    return res(ctx.status(200), ctx.json(newChannel));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('ChannelForm', () => {
  it('submits the form and navigates to /channels on successful save', async () => {
    const mockOnSubmit = jest.fn();

    const { getByLabelText, getByText, findByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<ChannelForm onSubmit={mockOnSubmit} />} />
          <Route path="/channels" element={<div>Channels Page</div>} />
        </Routes>
      </MemoryRouter>
    );
  
    const nameInput = getByLabelText('Nazwa kanału:');
    const clientCountInput = getByLabelText('Liczba klientów:');
    const submitButton = getByText('Zapisz');
  
    fireEvent.change(nameInput, { target: { value: 'Test Channel' } });
    fireEvent.change(clientCountInput, { target: { value: '5' } });
    fireEvent.click(submitButton);
  
    await findByText('Channels Page');
  
    expect(mockOnSubmit).toHaveBeenCalled();
    });
 
});
