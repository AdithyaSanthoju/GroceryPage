import React from 'react';

import { Navbar } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer">
      <h1 className='logo' style={{textAlign:"center", marginTop:"20px", marginBottom:"20px"}}>GROCERY</h1>
      <div className="footer-content">
      
        <div className="footer-section">
        
          <h4>About Us</h4>
          <p style={{color:"white"}}>We are committed to providing the Fresh Grocery</p>
          <h4 style={{color:"white"}}>Address:</h4>
          <p style={{color:"white"}}>Grocery,4thfloor<br/>Lbnager,Hyderabad<br/>,beside Lbnagar metro</p>
        </div>
        <div className="footer-section">
       
          <h4>Quick Links <i class="bi bi-caret-down-fill" style={{border:"none"}}></i></h4>
          <ul>
           
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Support</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p style={{color:"white"}}>Email: support@grocery.com</p>
          <p style={{color:"white"}}>Phone: +123 456 7890</p>
          <p style={{color:"white"}}><i class="bi bi-facebook"></i>&nbsp;&nbsp;<i class="bi bi-instagram"></i>&nbsp;&nbsp;<i class="bi bi-browser-chrome"></i></p>
          
        </div>
      </div>
      <hr/>
      <div className="footer-bottom">
        <p style={{color:"white"}}>&copy; 2024 Grocery. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;