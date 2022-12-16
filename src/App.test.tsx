import React from 'react';
import { fireEvent, render, screen, act, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom";

test('default state test', () => {
    render(<App />);
    const linkElement = screen.getByText(/CARDHOLDER NAME/i);
    expect(linkElement).toBeInTheDocument();
    const placeholderForName = screen.getByPlaceholderText('e.g. Jane Appleseed');
    expect(placeholderForName).toBeInTheDocument();
});
test('Bad Card Format', async () => {
    render(<App />);
    const cardInput = screen.getByLabelText('CARD NUMBER');
    //  userEvent.type(cardInput, "1234ABCD23451234")
    fireEvent.change(cardInput, { target: { value: '959164896389101E' } })
    expect(screen.getByText('9591')).toBeInTheDocument()
    expect(screen.getByText('6489')).toBeInTheDocument()
    expect(screen.getByText('6389')).toBeInTheDocument()
    expect(screen.getByText('101E')).toBeInTheDocument()
    userEvent.click(screen.getByRole('button'));
    await waitFor(() => {
        const errorLabel = screen.getByText(/Wrong format, numbers only/i);
        expect(errorLabel).toBeInTheDocument()
    })
})