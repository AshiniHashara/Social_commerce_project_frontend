import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Get category from URL
import "./Post_Product02.css";
import Navbar from "../../components/Navbar/Navbar";
import post02 from '../../components/Assets/post02.svg'



// Define subcategories based on selected category
const subcategories = {
  Jewellery: ["Necklace", "Ring", "Earrings", "Bracelets"],
  Women: ["Frock", "Denim", "T-Shirt", "Skirt"],
  Men: ["T-shirt","Shirt","Denim","Short"],
  Kids: ["frock","T-Shirt"],
  Home: ["Flower Vase","Wall Art","Clock"],
  Beauty: ["Lipstick","Nail Polish"],
  Bag: ["Backpack","Hand Bag"],
  Toy: ["Tedy Bear", "Remote Car"],
  Pet: ["pet food","Pet coat"]
};

const Post_Product02 = () => {
  const { category } = useParams(); // Get category from URL
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(category|| "");
  const [selectedSubCategory,setSelectedSubCategory] = useState("");
  
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);
  

  
  const handleSubcategoryClick = (sub) => {
    setSelectedSubCategory(sub);
    localStorage.setItem("selectedSubCategory",sub);

    navigate('/post03');
};


  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);

  return (
    <div className="select-subcategory">
      <Navbar />
      <h1>Select Sub Category</h1>
      <img className="image" src={post02} alt=""/>
      <h1>{selectedCategory} Subcategories</h1>
      <div className="subcategories-container">
        {subcategories[selectedCategory]?.map((sub, index) => (
          <div key={index} onClick={()=> handleSubcategoryClick(sub)} className="subcategory-item">
            <p>{sub}</p>
          </div>
        )) || <p>No subcategories available</p>}
      </div>
    </div>
  );
};

export default Post_Product02;
