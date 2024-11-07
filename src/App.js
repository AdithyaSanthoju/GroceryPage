 import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Wishlist from './components/Wishlist';
import ProductGrid from './components/CardLayout';
import CreateAccount from './components/CreateAcc';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import LoginForm from './components/Login';
import DmartNavbar from './components/Navbar';
import Offerzone from './components/OfferCards';
import Para from './components/Paragraph';
import PopularCategories from './components/Popularcat';
import Cart from './components/cartcontext';
import CarouselComponent from './components/CarouselSlide';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PoojaNeedGrid from './components/PoojaNeed';
function App() {
  const [cart, setCart] = useState({ products: [] });
  const [showCart, setShowCart] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    AOS.init({ duration: 500 });
    // Check localStorage for user email
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setLoggedIn(true);
      setUserEmail(savedEmail);
    }
  }, []);

  const toggleCart = () => setShowCart(prev => !prev);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingProduct = prev.find(item => item.name === product.name);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        product.quantity = 1;
        return [...prev, product];
      }
      return [...prev];
    });
  };

  const removeFromCart = (productName) => {
    setCart(prev => prev.filter(item => item.name !== productName));
  };

  const handleLogin = (email) => {
    setLoggedIn(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    toast.success("You have signed out.");
    setLoggedIn(false);
    setUserEmail('');
    localStorage.removeItem('userEmail'); // Clear email from localStorage
    toast.success("Session expired..please Login");
  };

  return (
    <div className="App">
      <Router>
        <DmartNavbar 
          loggedIn={loggedIn} 
          handleLogout={handleLogout} 
          toggleCart={toggleCart} 
          userEmail={userEmail}
          cartCount={cart.products.length}
        />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <p className="p1" style={{ marginTop: "50px" }}>Popular Categories</p>
              <PopularCategories />
              <p className="p1">This Week's Savers</p>
              <ProductGrid 
                cart={cart} 
                setCart={setCart} 
                addToCart={addToCart} 
                removeFromCart={removeFromCart} 
              />
              <CarouselComponent />
              <p className="p1">Offer Zone</p>
              <Offerzone />
              <Para />
              <Footer />
            </>
          } />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/PoojaNeedGrid" element={<PoojaNeedGrid cart={cart} setCart={setCart} />} /> 
        </Routes>
        <Cart
          cart={cart}
          showCart={showCart}
          toggleCart={toggleCart}
          setCart={setCart}
        />
      </Router>
    </div>
  );
}

export default App;