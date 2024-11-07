import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const MyOrders = ({ showOrders, toggleOrders }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (showOrders) {
            fetchOrders();
        }
    }, [showOrders]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/orders');
            setOrders(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching orders:', err);
            if (err.response) {
                setError(`Error: ${err.response.data.message || 'Failed to fetch orders'}`);
                toast.error(err.response.data.message || 'Failed to fetch orders');
            } else if (err.request) {
                setError('No response from server.');
                toast.error('No response from server.');
            } else {
                setError('An error occurred while fetching orders.');
                toast.error('An error occurred while fetching orders.');
            }
            setLoading(false);
        }
    };

    return (
        <Modal show={showOrders} onHide={toggleOrders}>
            <Modal.Header closeButton>
                <Modal.Title>My Orders</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <p>Loading your orders...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order._id} className="order-item mb-3">
                            <h5>Order ID: {order._id}</h5>
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {order.products.map(item => (
                                    <li key={item.productId}>
                                        {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                                        <img src={item.image} alt={`Product ${item.productId}`} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                    </li>
                                ))}
                            </ul>
                            <p><strong>Total: ${order.total.toFixed(2)}</strong></p>
                            <p>Status: {order.status}</p>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={toggleOrders}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MyOrders;
