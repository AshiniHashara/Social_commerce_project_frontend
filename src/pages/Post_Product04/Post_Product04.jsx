import React, { useState } from 'react'
import post04 from '../../components/Assets/Exams-bro.svg'
import "./Post_Product04.css"
import Button from '../../components/Button/Button'
import Navbar from '../../components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'; 

const Post_Product04 = () => {
    const[ productDescription, setProductDescription] =useState("");
    const navigate = useNavigate();
    const handleNext = () => {
        if(productDescription.trim()===""){
            Swal.fire("Please Enter Product Description");
            return;
        }
        localStorage.setItem("ProductDescription",productDescription);
        navigate("/post05")
    };
  return (
    <div className='product_description'>
        <Navbar/>
        <h1>Enter Product Description</h1>
        <img className="image" src={post04} alt=""/>
        <div className='input-field-description'>
        <textarea type='description' id='inputdescription' className='inputdescription' placeholder='Enter Product Description' value={productDescription} onChange={(e) => setProductDescription(e.target.value)}/>
        </div>
        <div className='back-next-buttons'>
            <Button className='back' value="Back" onClick={()=> navigate("/post03")}/>
            <Button className='next' value= "Next" onClick={handleNext}/>
        </div>
    </div>
  )
}

export default Post_Product04