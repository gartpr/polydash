import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent} from '@testing-library/react';
import OrderForm from '../Pages/OrderForm.js';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../Components/Cart';

test("renders the empty form correctly", () => {
    //render the page
    render(
        <AuthProvider>
            <CartProvider>
                <OrderForm/>
            </CartProvider>
        </AuthProvider>
    );

    //assure neccesary test is on the page
    expect(screen.getByText("Cart Summary")).toBeInTheDocument();
    expect(screen.getByText("Name for order")).toBeInTheDocument();
    expect(screen.getByText("Delivery Location")).toBeInTheDocument();
    expect(screen.getByText("Payment Information")).toBeInTheDocument();
    expect(screen.getByText("Additional Comments")).toBeInTheDocument();

    //assure the place order button is on the page
    const placeOrderButton = screen.getByRole('button', { name: 'Place Order' });
    expect(placeOrderButton).toBeInTheDocument();

    //assure form entries are on the page
    const nameInput = screen.getByPlaceholderText('Enter name');
    const locationInput = screen.getByPlaceholderText('Enter delivery location');
    const paymentInfoInput = screen.getByPlaceholderText('Enter payment information');
    const commentInfoInput = screen.getByPlaceholderText('Enter any comments');
  
    expect(nameInput).toBeInTheDocument();
    expect(locationInput).toBeInTheDocument();
    expect(paymentInfoInput).toBeInTheDocument();
    expect(commentInfoInput).toBeInTheDocument();
});

test("allows input in each box", () => {
    //render the page
    render(
        <AuthProvider>
            <CartProvider>
                <OrderForm/>
            </CartProvider>
        </AuthProvider>
    );

    //find each text box
    const nameInput = screen.getByPlaceholderText('Enter name');
    const locationInput = screen.getByPlaceholderText('Enter delivery location');
    const paymentInfoInput = screen.getByPlaceholderText('Enter payment information');
    const commentInfoInput = screen.getByPlaceholderText('Enter any comments');

    //simulate user input
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(locationInput, { target: { value: '123 Main St' } });
    fireEvent.change(paymentInfoInput, { target: { value: 'Credit Card' } });
    fireEvent.change(commentInfoInput, { target: { value: 'Special instructions' } });

    //assert that the values have been updated
    expect(nameInput).toHaveValue('John Doe');
    expect(locationInput).toHaveValue('123 Main St');
    expect(paymentInfoInput).toHaveValue('Credit Card');
    expect(commentInfoInput).toHaveValue('Special instructions');
});
    