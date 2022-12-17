import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

test('No Year Specified', async () => {
    render(<App />);
    const yearInput = screen.getByPlaceholderText('YY');
    expect(yearInput).toBeInTheDocument()
    userEvent.click(screen.getByRole('button'));
    await waitFor(() => {
        const errorLabel = screen.getByText(/Insert a year/i);
        expect(errorLabel).toBeInTheDocument()
    })

})


test('Create Correctly', async () => {
    render(<App />);
    const cardInput = screen.getByLabelText('CARD NUMBER');
    fireEvent.change(cardInput, { target: { value: '9591648963891012' } })
    expect(screen.getByText('9591')).toBeInTheDocument()
    expect(screen.getByText('6489')).toBeInTheDocument()
    expect(screen.getByText('6389')).toBeInTheDocument()
    expect(screen.getByText('1012')).toBeInTheDocument()

    const nameInput = screen.getByPlaceholderText('e.g. Jane Appleseed');
    fireEvent.change(nameInput, { target: { value: 'Test McTesty' } })

    const monthInput = screen.getByPlaceholderText('MM');
    fireEvent.change(monthInput, { target: { value: '11' } })
    const yearInput = screen.getByPlaceholderText('YY');
    fireEvent.change(yearInput, { target: { value: '25' } })

    const cvcInput = screen.getByPlaceholderText('e.g. 123');
    fireEvent.change(cvcInput, { target: { value: '123' } })

    userEvent.click(screen.getByRole('button'));
    await waitFor(() => {
        const thanklabel = screen.getByText(/THANK YOU/i);
        expect(thanklabel).toBeInTheDocument()
    })
    userEvent.click(screen.getByRole('button'));
    await waitFor(() => {
        expect(screen.getByPlaceholderText('e.g. Jane Appleseed')).toBeInTheDocument();
    })

}) 