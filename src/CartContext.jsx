import React, { createContext, useState, useEffect } from 'react';
const CartContext = createContext();
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (savedCart) {
            setCart(savedCart);
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
    const addToCart = (product) => {
        setCart(prevCart => {
            const existingProductIndex = prevCart.findIndex(
                item => item._id === product._id && item.selectedVariant?.value === product.selectedVariant?.value
            );
    
            if (existingProductIndex >= 0) {
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex] = {
                    ...updatedCart[existingProductIndex],
                    quantity: updatedCart[existingProductIndex].quantity + 1,
                };
                return updatedCart;
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };
    
    const removeFromCart = (productId, variantValue) => {
        setCart(prevCart => 
            prevCart.filter(item => 
                !(item._id === productId && (item.selectedVariant?.value === variantValue || variantValue === undefined))
            )
        );
    };      
    const incrementQuantity = (productId, variantValue) => {
        setCart(prevCart => 
            prevCart.map(item =>
                item._id === productId && (item.selectedVariant?.value === variantValue || variantValue === undefined)
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };       
    const decrementQuantity = (productId, variantValue) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item._id === productId && (item.selectedVariant?.value === variantValue || variantValue === undefined) && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };    
    const getTotal = () => {
        return cart.reduce((total, item) => {
            const itemPrice = item.selectedVariant ? item.selectedVariant.price : item.basePrice;
            return total + itemPrice * item.quantity;
        }, 0);
    };
    
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, getTotal }}>
            {children}
        </CartContext.Provider>
    );
};
export { CartContext, CartProvider };
