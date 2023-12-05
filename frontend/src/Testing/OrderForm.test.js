import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent} from '@testing-library/react';
import OrderForm from '../Pages/OrderForm.js';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../Components/Cart';
import { addDoc } from 'firebase/firestore';
import { BrowserRouter } from 'react-router-dom';

test("renders the empty form correctly", () => {
    //render the page
    render(
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <OrderForm />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    //assure neccesary text is on the page
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
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <OrderForm />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
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
  
// Mock the console.log and window.alert functions
global.console.log = jest.fn();
global.window.alert = jest.fn();
  
test('displays alert and logs messages when user is not signed in', () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <OrderForm />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
  
    const placeOrderButton = screen.getByRole('button', { name: 'Place Order' });
    fireEvent.click(placeOrderButton);
  
    setTimeout(() => {
        expect(global.console.log).toHaveBeenCalledWith('User not signed in');
        expect(global.window.alert).toHaveBeenCalledWith('You must be signed in to place an order');
    }, 0);
});

// Mock the AuthProvider to provide a signed-in user
jest.mock('../context/AuthContext', () => ({
    ...jest.requireActual('../context/AuthContext'),
    useAuth: () => ({ uid: 'testUserId', email: 'test@example.com' }),
}));

jest.mock('../Components/Cart', () => ({
    ...jest.requireActual('../Components/Cart'),
    useCart: () => ({
      cartItems: [
        {
          id: 'mockItemId1',
          itemName: 'Mock Item 1',
          itemCost: 10.0,
          quantity: 2,
        }
      ],
      removeFromCart: jest.fn(),
      getCartTotal: jest.fn(() => 35.0),
    }),
}));
  
test('allows input in each box and submits the form', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <OrderForm />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    );
  
    // Check if the items are displayed in the cart summary
    expect(screen.getByText('Mock Item 1 (Qty: 2)')).toBeInTheDocument();
  
    // Simulate a button click to remove an item from the cart
    const removeButton = screen.getByRole('button', { name: 'Remove' });
    fireEvent.click(removeButton);
  
    // Check if the removeFromCart function is called with the correct item ID
    setTimeout(() => {
        expect(CartProvider.useCart.removeFromCart).toHaveBeenCalledWith('mockItemId1');
    }, 0);
});

// Mock the addDoc function
jest.mock('firebase/firestore', () => ({
    ...jest.requireActual('firebase/firestore'),
    addDoc: jest.fn(),
}));

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});
  
test('handles successful order placement', async () => {
    // Render the component
    render(
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <OrderForm />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    );
  
    // Find each text box and simulate user input
    const nameInput = screen.getByPlaceholderText('Enter name');
    const locationInput = screen.getByPlaceholderText('Enter delivery location');
    const paymentInfoInput = screen.getByPlaceholderText('Enter payment information');
    const commentInfoInput = screen.getByPlaceholderText('Enter any comments');
  
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(locationInput, { target: { value: '123 Main St' } });
    fireEvent.change(paymentInfoInput, { target: { value: 'Credit Card' } });
    fireEvent.change(commentInfoInput, { target: { value: 'Special instructions' } });
  
    // Simulate a button click to submit the form
    const placeOrderButton = screen.getByRole('button', { name: 'Place Order' });
    fireEvent.click(placeOrderButton);

    const mockError = new Error('Mock error during order placement');
    addDoc.mockRejectedValueOnce(mockError);
  
    // Mock the Firestore addDoc function to resolve successfully
    addDoc.mockResolvedValueOnce({ id: 'mockOrderId' });
  
    // Wait for asynchronous operations to complete
    setTimeout(() => {
      // Check that the order document is added successfully
      expect(addDoc).toHaveBeenCalledWith(expect.anything(), expect.any(Object));
      expect(global.console.log).toHaveBeenCalledWith('Order document added successfully:', 'mockOrderId');
      expect(global.window.location.href).toBe('/order/tracking');
      
      expect(console.error).toHaveBeenCalledWith('Error adding order document:', mockError);
      expect(window.alert).toHaveBeenCalledWith('Something went wrong with your order');
    });
});
    