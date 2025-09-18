import React, { useState } from 'react'
import post05 from '../../components/Assets/Banknote-bro.svg'
import "./Post_Product05.css"
import Button from '../../components/Button/Button'
import Navbar from '../../components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

const Post_Product05 = () => {
    const[ productPrice, setProductPrice] =useState(() => {
            return localStorage.getItem("ProductPrice") || "";
        });
    const navigate = useNavigate();
    const handleNext = () => {
       const trimmedPrice = productPrice.trim();

  if (!trimmedPrice) {
    Swal.fire("Please enter the product price.");
    return;
  }

  const priceValue = parseFloat(trimmedPrice);

  if (isNaN(priceValue) || priceValue <= 0) {
    Swal.fire("Please enter a valid price greater than 0.");
    return;
  }
        localStorage.setItem("ProductPrice",productPrice);
        navigate("/post06")
    };
  return (
    <div className='product_price'>
        <Navbar/>
        <h1>Enter Product Price</h1>
        <img className="image" src={post05} alt=""/>
        <div className='input-field'>
        <input type='price' id='inputprice' className='inputprice' placeholder='Rs.' value={productPrice} onChange={(e) => setProductPrice(e.target.value)}/>
        </div>
        <div className='back-next-buttons'>
            <Button className='back' value="Back" onClick={()=> navigate("/post04")}/>
            <Button className='next' value= "Next" onClick={handleNext}/>
        </div>
    </div>
  )
}

export default Post_Product05