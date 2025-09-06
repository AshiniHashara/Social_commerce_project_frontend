import React from 'react'
import Button from '../Button/Button'
import "./ShareCart.css"

const ShareCart = ({img,description,className, value, onClick}) => {
  const role = localStorage.getItem("role");


  return (
    <div className="cart-container">
        <div className="cart-content">
        <p className="cart-description">{description}</p>
        <Button className={className} value={value} onClick={onClick} />
      </div>
      <img src={img} alt="cart-visual" className="cart-image" />
      
    </div>
  )
}
export default ShareCart