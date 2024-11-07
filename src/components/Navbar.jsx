import React, { useState } from 'react';
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import MyOrders from './Myorders';

function DmartNavbar({ loggedIn, handleLogout, toggleCart, userEmail, cartCount }) {
  const [showOrders, setShowOrders] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleOrdersModal = () => setShowOrders(!showOrders);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to the product page with the search query as a parameter
      navigate(`/product/${searchQuery}`);
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="p-3 fixed-top">
      <Navbar.Brand href="/" className="logo">GROCERY</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link href="/">Ready to Cook</Nav.Link>
          <Nav.Link href="/">Home Appliances</Nav.Link>
          <Nav.Link href="/">Cookware</Nav.Link>
          <Nav.Link href="/">Serveware</Nav.Link>
        </Nav>
        <Form className="d-flex mx-auto" onSubmit={handleSearch}>
          <FormControl
            type="search"
            placeholder="Search for items..."
            className="me-2"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="outline-success" type="submit" className="btn-1">
            Search
          </Button>
        </Form>
        <Nav>
          {loggedIn ? (
            <NavDropdown title={`Hi, ${userEmail.split('@')[0]}`} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={toggleOrdersModal}>My Orders</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Sign Out</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link as={Link} to="/login">
              <i className="bi bi-person"></i>
            </Nav.Link>
          )}
          <Nav.Link as={Link} to="/wishlist" title="Wishlist">
            <i className="bi bi-heart"></i>
          </Nav.Link>
          <Nav.Link href="#notifications">
            <i className="bi bi-bell"></i>
          </Nav.Link>
          <Nav.Link onClick={toggleCart}>
            <i className="bi bi-cart"></i><sup>({cartCount})</sup>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <MyOrders showOrders={showOrders} toggleOrders={toggleOrdersModal} />
    </Navbar>
  );
}

export default DmartNavbar;
