import React from 'react'
import Button from '../Button/Button'
import "./Cart.css"
import { jwtDecode } from "jwt-decode"; 

const Cart = ({img,description,className, value, onClick}) => {

  const handleClick = () => {
    const accessToken = localStorage.getItem("accessToken");
    
      if (!accessToken) {
        alert("Please log in as wholeseller to post  this product.");
        navigate("/login");
        return;
      }
    
      try {
        const decoded = jwtDecode(accessToken);
        console.log(decoded.Roles); 
        const role = decoded.Roles;

      // allow only wholeseller
      if (role === "WHOLESELLER") {
        onClick();
      } else {
        alert("You do not have permission to post product.");
      }
      } catch (err) {
        console.error("Error decoding token:", err);
        alert("Invalid token, please log in again.");
        navigate("/login");
      }
    };
    

  return (
    <div className="cart-container">
      <img src={img} alt="cart-visual" className="cart-image" />
      <div className="cart-content">
        <p className="cart-description">{description}</p>
        <Button className={className} value={value} onClick={handleClick} />
      </div>
    </div>
  )
}
export default Cart