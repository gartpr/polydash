import React, { useState, useEffect } from 'react';
import { HStack, Text, Box, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Cart = ({ cartItems, getCartTotal }) => {
    return (
        <Link as={RouterLink} to="/order/form">
            <Box borderWidth="1px" borderRadius="lg" p={2} maxW="300px">
                <Text fontSize="lg" textAlign="center">Cart Summary</Text>
                {cartItems.map((item) => (
                    <HStack key={item.id} justifyContent="space-between">
                        <Text>{item.itemName} (Qty: {item.quantity})</Text>
                        <Text>${(item.itemCost * item.quantity).toFixed(2)}</Text>
                    </HStack>
                ))}
                <HStack justifyContent="space-between">
                    <Text>Delivery Fee</Text>
                    <Text>${(getCartTotal()/1.2 * 0.2).toFixed(2)}</Text> 
                </HStack>
            <HStack justifyContent="space-between">
                    <Text>Total:</Text>
                    <Text>${getCartTotal()}</Text>
                </HStack>
            </Box>
        </Link>
    );
};

const CartContext = React.createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Load cart from local storage on component mount
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item, restaurantId) => {
        if(cartItems.length >= 1){
            if(cartItems[0].restaurantId != restaurantId){
                alert("All your items must be from the same restaurant. Clear your cart to add an item")
                return
            }
        }
      
        const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
        if (existingItemIndex !== -1) {
            // If item already exists, update its quantity
            const updatedCart = [...cartItems];
            updatedCart[existingItemIndex] = {
                ...updatedCart[existingItemIndex],
                quantity: updatedCart[existingItemIndex].quantity + 1,
            };
            setCartItems(updatedCart);
        } else {
            // If item doesn't exist, add it to the cart
            const itemWithRestaurantId = { ...item, restaurantId: restaurantId, quantity: 1 };
            setCartItems([...cartItems, itemWithRestaurantId]);
        }
    };

    const removeFromCart = (itemId) => {
        const itemIndex = cartItems.findIndex((item) => item.id === itemId);

        if (itemIndex !== -1) {
            const updatedCart = [...cartItems];
            updatedCart.splice(itemIndex, 1);
            setCartItems(updatedCart);
        }
    };

    const getCartTotal = () => {
        let total = cartItems.reduce((acc, item) => acc + item.itemCost, 0);
        total += (total * 0.2);
        return total.toFixed(2);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        getCartTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const useCart = () => {
    const context = React.useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export { Cart, useCart, CartProvider };
