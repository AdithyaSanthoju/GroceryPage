import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { productName } = useParams(); // This will capture the search query from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Make an API request to fetch the product based on the name (or a similar filter)
        const response = await axios.get(`http://localhost:5000/product/${productName}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [productName]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>Price: ${product.price}</p>
      <p>Discount: {product.discount}%</p>
      {/* Add other product details */}
    </div>
  );
};

export default ProductDetailPage;
