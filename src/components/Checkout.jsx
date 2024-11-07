import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Checkout = ({ showCheckout, toggleCheckout, cart }) => {
    const [loading, setLoading] = useState(true);
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash'); // Default to cash on delivery
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        if (showCheckout) {
            setLoading(true);
            fetchOrderDetails();
        }
    }, [showCheckout]);

    const fetchOrderDetails = async () => {
        try {
            const response = await axios.get('http://localhost:5000/checkout/details', {
                params: { cart }
            });
            setOrderDetails(response.data);
        } catch (err) {
            console.error('Error fetching order details:', err);
            setError('Failed to fetch order details.');
        } finally {
            setLoading(false);
        }
    };

    const handleCheckout = async () => {
        if (!address) {
            toast.error('Address is required before placing an order.');
            return; // Prevent checkout if address is empty
        }

        try {
            const response = await axios.post('http://localhost:5000/checkout/create', {
                products: cart.products,
                image: cart.products.map(item => item.image), 
                address,
                paymentMethod
            });
            toast.success(`Order placed successfully! Order ID: ${response.data.orderId}`);
            toggleCheckout(); // Close checkout modal after successful order
            navigate('/'); // Navigate to the main page (or your desired route)
        } catch (err) {
            console.error('Error during checkout:', err);
            setError('Checkout failed. Please try again.');
            toast.error('Checkout failed. Please try again.'); // Notify the user of failure
        }
    };

    return (
        <Modal show={showCheckout} onHide={toggleCheckout}>
            <Modal.Header closeButton>
                <Modal.Title>Checkout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <p>Loading order details...</p>
                ) : (
                    <>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {orderDetails ? (
                            <div>
                                <h5>Order Summary:</h5>
                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                    {orderDetails.products.map((item) => (
                                        <li key={item.productId}>
                                            {item.name} - ${(typeof item.price === 'number' ? item.price.toFixed(2) : '0.00')} x {item.quantity}
                                            <img src={item.image} alt={`Product ${item.productId}`} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                        </li>
                                        
                                    ))}
                                </ul>
                                
                                <p style={{ fontWeight: 'bold' }}>
                                    Total: ${(typeof orderDetails.total === 'number' ? orderDetails.total.toFixed(2) : '0.00')}
                                </p>
                                <Form.Group>
                                    <Form.Label>Delivery Address:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Enter your address"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Payment Method:</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label="Cash on Delivery"
                                        value="cash"
                                        checked={paymentMethod === 'cash'}
                                        onChange={() => setPaymentMethod('cash')}
                                    />
                                </Form.Group>
                            </div>
                        ) : (
                            <p>No items in cart.</p>
                        )}
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={toggleCheckout}>Close</Button>
                <Button variant="primary" onClick={handleCheckout}>Place Order</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Checkout;
