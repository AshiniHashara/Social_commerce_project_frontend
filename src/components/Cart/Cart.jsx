import React from 'react'
import Button from '../Button/Button'
import "./Cart.css"

const Cart = ({img,description,className, value, onClick}) => {
  const role = localStorage.getItem("role");

  const handleClick = () => {
    if (role !== "WHOLESELLER") {
      alert("Please log in as a wholeseller to access this feature.");
      return;
    }
    onClick(); // call original function if role matches
  }

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