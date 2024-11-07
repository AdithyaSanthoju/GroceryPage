import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Checkout from './Checkout';

const Cart = ({ showCart, toggleCart, cart, setCart }) => {
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState('');
    const [showCheckout, setShowCheckout] = useState(false);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('http://localhost:5000/cart/allcartitems');
                setCart(response.data);
            } catch (error) {
                console.error('Error fetching cart:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [setCart]);

    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) return;

        const updatedCart = cart.products.map(item =>
            item.productId === productId ? { ...item, quantity: newQuantity } : item
        );

        setCart({ products: updatedCart });

        try {
            await axios.post('http://localhost:5000/cart/updatequantity', { productId, quantity: newQuantity });
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const deleteFromCart = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/cart/remove/${productId}`);
            const updatedCart = cart.products.filter(item => item.productId !== productId);
            setCart({ products: updatedCart });
            setNotification('Product removed from cart!');

            setTimeout(() => {
                setNotification('');
            }, 2000);
        } catch (error) {
            console.error('Error deleting from cart:', error);
            setNotification('Failed to remove product.');
        }
    };

    const calculateTotalPrice = () => {
        return cart.products.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0).toFixed(2);
    };

    const toggleCheckout = () => setShowCheckout(!showCheckout);

    return (
        <>
            <Modal show={showCart} onHide={toggleCart}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? (
                        <p>Loading cart...</p>
                    ) : cart && cart.products && cart.products.length > 0 ? (
                        <>
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {cart.products.map((item) => (
                                    <li key={item.productId} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                        <img src={item.image} alt={`Product ${item.productId}`} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                        <div>
                                            <p>Name: {item.name}</p>
                                            <p>Price: ${item.price.toFixed(2)}</p>
                                            <p>Discount: {item.discount ? `${item.discount}%` : 'N/A'}</p>
                                            <p>
                                                Quantity: 
                                                <Button variant="secondary" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>-</Button>
                                                {item.quantity}
                                                <Button variant="secondary" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</Button>
                                            </p>
                                            <Button onClick={() => deleteFromCart(item.productId)} style={{ marginLeft: '10px' }}>Remove</Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <p style={{ fontWeight: 'bold', marginTop: '20px' }}>Total Price: ${calculateTotalPrice()}</p>
                        </>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                    {notification && <p style={{ color: 'green', marginTop: '20px' }}>{notification}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleCart}>Close</Button>
                    <Button variant="primary" onClick={toggleCheckout}>Checkout</Button>
                </Modal.Footer>
            </Modal>
            <Checkout showCheckout={showCheckout} toggleCheckout={toggleCheckout} cart={cart} />
        </>
    );
};

export default Cart;
