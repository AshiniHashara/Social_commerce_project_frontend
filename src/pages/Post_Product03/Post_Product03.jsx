import React, { useState } from 'react'
import post03 from '../../components/Assets/Thinking face-bro.svg'
import "./Post_Product03.css"
import Button from '../../components/Button/Button'
import Navbar from '../../components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'; 

const Post_Product03 = () => {
    //const[ productName, setProductName] =useState("");
    const[ productName, setProductName] =useState(() => {
        return localStorage.getItem("ProductName") || "";
    });
    const navigate = useNavigate();
    const handleNext = () => {
        console.log("Hello ");
        if(productName.trim()===""){
            Swal.fire("Please Enter Product Name");
            return;
        }
        localStorage.setItem("ProductName",productName);
        navigate("/post04")
    };
  return (
    <div className='product_name'>
        <Navbar/>
        <h1>Enter Product Name</h1>
        <img className="image" src={post03} alt=""/>
        <div className='input-field'>
        <input type='name' id='inputname' className='inputname' placeholder='Enter Product Name' value={productName} onChange={(e) => setProductName(e.target.value)}/>
        </div>
        <div className='back-next-buttons'>
            <Button className='back' value="Back" onClick={()=> navigate("/post02")}/>
            <Button className='next' value= "Next" onClick={handleNext}/>
        </div>
    </div>
  )
}

export default Post_Product03