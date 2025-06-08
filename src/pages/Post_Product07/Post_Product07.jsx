import React, { useEffect, useState } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import "./Post_Product07.css"
import Navbar from '../../components/Navbar/Navbar';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const Post_Product07 = () => {
    const navigate = useNavigate();

  const [storedImages, setStoredImages] = useState([]);
  const [storedCategory, setStoredCategory] = useState(() => {
    return localStorage.getItem("selectedCategory") || "";
});
const [storedSubCategory, setStoredSubCategory] = useState(() => {
    return localStorage.getItem("selectedSubCategory") || "";
});
const [storedName, setStoredName] = useState(() => {
    return localStorage.getItem("ProductName") || "";
});
const [storedPrice, setStoredPrice] = useState(() => {
    return localStorage.getItem("ProductPrice") || "";
});
const [storedDescription, setStoredDescription] = useState(() => {
    return localStorage.getItem("ProductDescription") || "";
});

  useEffect(() => {
    const images = JSON.parse(localStorage.getItem("uploadedImages")) || [];
    setStoredImages(images);
  }, []);

  const handleSubmit = async () => {
  try {
    
    const productData = {
      name: storedName,
      category_id: storedCategory,
      subcategory_id: storedSubCategory,
      description: storedDescription,
      price: storedPrice,
      available: true,
      quantity: 100,
      releaseDate: new Date().toISOString()
    };

    
    const productResponse = await axios.post("http://localhost:8080/api/product", productData);
    const productId = productResponse.data.id; 

    console.log("Product created with ID:", productId);

    
    for (let base64Image of storedImages) {
      const blob = await fetch(base64Image).then(res => res.blob());
      const formData = new FormData();
      formData.append("image", blob, "image.png");
      formData.append("productId", productId);

      await axios.post("http://localhost:8080/api/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    }

    alert("Product and images uploaded successfully!");
    navigate("/home"); 

  } catch (error) {
  console.error("Upload error:", error);

  if (error.response && error.response.data) {
  const message = typeof error.response.data === "string"
    ? error.response.data
    : JSON.stringify(error.response.data);
  alert("Failed to upload product: " + message);
}

}

};


  return (
    <>
    <Navbar/>
    <div className='review-container'>
        
      <h1>Review</h1>
      <div className="image-preview-container">
        <Carousel autoSlide={true} >
        {storedImages.map((image, index) =>
          image ? (
          <img 
          key={index} 
          src={image} 
          alt={`Uploaded ${index}`} 
          className="carousel-image" 
          /> 
          ): null
        )}
        </Carousel>
        </div>
        <button className="edit-button" onClick={()=> navigate("/post06")}>Edit</button>
      
      <div className="details-container">
        <div className="detail-row">
        <p className="detail-label">Category</p>
        <p className="detail-value">{storedCategory}</p>
        <button className="edit-button" onClick={()=> navigate("/post01")}>Edit</button>
        </div>
        <div className="detail-row">
            <p className="detail-label">Sub Category</p>
            <p className="detail-value">{storedSubCategory}</p>
            <button className="edit-button" onClick={()=> navigate("/post02")}>Edit</button>
        </div>
        <div className="detail-row">
            <p className="detail-label">Name</p>
            <p className="detail-value">{storedName}</p>
            <button className="edit-button" onClick={()=> navigate("/post03")}>Edit</button>
        </div>
        <div className="detail-row">
            <p className="detail-label">Price</p>
            <p className="detail-value">{storedPrice}</p>
            <button className="edit-button" onClick={()=> navigate("/post05")}>Edit</button>
        </div>
        <div className="detail-row">
            <p className="detail-label">Description</p>
            <p className="detail-value">{storedDescription}</p>
            <button className="edit-button" onClick={()=> navigate("/post04")}>Edit</button>
        </div>
      </div>
      <Button className='submit' value="Submit" onClick={handleSubmit} />

    </div>
    
    </>
  );
};

export default Post_Product07;
