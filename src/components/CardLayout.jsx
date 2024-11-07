import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductGrid = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/product/all');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      const response = await axios.post('http://localhost:5000/cart/addtocart', [productId]);
      setCart(response.data);
      toast.success('Item added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/cart/remove/${productId}`);
      setCart(response.data);
      toast.info('Item removed from cart!');
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const addToWishlist = async (product) => {
    try {
      await axios.post('http://localhost:5000/api/wishlist', {
        productId: product._id,
        name: product.name,
        discount: product.discount,
        image: product.image,
        price: product.price
      });
      toast.success('Item added to wishlist!');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Error adding item to wishlist.');
    }
  };

  return (
    <>
      <Row className="g-4 justify-content-center flex-wrap">
        {products.map((product) => (
          <ProductCard 
            key={product._id}
            {...product}
            addToCart={addToCart} 
            removeFromCart={removeFromCart}
            addToWishlist={() => addToWishlist(product)}
            isInCart={Array.isArray(cart) && cart.some(item => item.productId === product._id)}
            productId={product._id}
          />
        ))}
      </Row>
      <ToastContainer />
    </>
  );
};

const ProductCard = ({ image, name, price, discount, addToCart, removeFromCart, addToWishlist, isInCart, productId }) => (
  <Col xs={12} md={4} lg={2} className="d-flex justify-content-center">
    <Card style={{ width: '265px', height: 'auto', padding: '8px 12px' }} className="text-center">
      <Card.Img
        variant="top"
        src={image}
        style={{ height: 'auto', maxHeight: '200px', width: '100%', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column" style={{ flexGrow: 1 }}>
        <Card.Title style={{ margin: '10px 0' }}>{name}</Card.Title>
        <Card.Text className="mb-auto">
          <div>Price: ${price}</div>
          <div>Discount: {discount}%</div>
        </Card.Text>
        {!isInCart ? (
          <Button variant="success" onClick={() => addToCart({ image, name, price, discount, productId })}>
            Add to Cart
          </Button>
        ) : (
          <Button variant="danger" onClick={() => removeFromCart(productId)} style={{ minHeight: '40px', padding: '10px', whiteSpace: 'nowrap' }} >
            Remove from Cart
          </Button>
        )}
        <Button variant="success" className="mt-2" onClick={addToWishlist} style={{ minHeight: '33px', marginTop: '8px', padding: '5px', whiteSpace: 'nowrap' }} >
          Add to Wishlist
        </Button>
      </Card.Body>
    </Card>
  </Col>
);

export default ProductGrid;
