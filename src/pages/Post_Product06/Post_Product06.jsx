import React, { useState } from 'react';
import post06 from '../../components/Assets/Photos-bro.svg';
import "./Post_Product06.css";
import Navbar from '../../components/Navbar/Navbar';
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'

const Post_Product06 = () => {
     const navigate = useNavigate();
 
  const [selectedImages, setSelectedImages] = useState(Array(5).fill(null));

  
  const handleImageChange = (event, index) => {
    const file = event.target.files[0]; 

    if (file) {
      const reader = new FileReader(); 
      reader.onloadend = () => {
        const newImages = [...selectedImages];
        newImages[index] = reader.result; 
        setSelectedImages(newImages);

        localStorage.setItem("uploadedImages", JSON.stringify(newImages));
      };

      
      reader.readAsDataURL(file); 
    }
  };

  const handleNext = () => {
   // localStorage.setItem("uploadedImages", JSON.stringify(selectedImages)); 
    navigate("/post07"); 
  };
  return (
    <>
    <Navbar />
    <div className="product-container">
      
      <h1>Add Photos (Up to 5)</h1>
      <p>Upload Pictures Of Your Product</p>
      <img className="image" src={post06} alt="Illustration" />

      <div className="upload-container">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="upload-box">
            <input
              type="file"
              id={`imageInput${index}`}
              className="file-input"
              accept="image/*"
              onChange={(e) => handleImageChange(e, index)}
            />
            {selectedImages[index] ? (
              <img src={selectedImages[index]} alt="Preview" className="preview-image" />
            ) : (
              <label htmlFor={`imageInput${index}`} className="upload-label">
                Upload
              </label>
            )}
          </div>
        ))}
      </div>

      <div className='back-next-buttons'>
            <Button className='back' value="Back" onClick={()=> navigate("/post05")}/>
            <Button className='next' value= "Next" onClick={handleNext}/>
        </div>
    </div>
    </>
  );
};

export default Post_Product06;
