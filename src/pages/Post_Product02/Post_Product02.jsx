import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import "./Post_Product02.css";
import Navbar from "../../components/Navbar/Navbar";
import post02 from '../../components/Assets/post02.svg'
import axios from "axios";

const Post_Product02 = () => {

const [subCategory, setSubCategory] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/category")
        .then(res => {
            setSubCategory(res.data);
        })
        .catch(err => {
            console.error("Error fetching products:", err);
        });
    }, []);

  const { category } = useParams(); 
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
          {
            subCategory
              .find((cat) => cat.name === selectedCategory)
              ?.subCategory
              ?.map((sub, index) => (
                <div
                  key={sub.subCatId}
                  onClick={() => handleSubcategoryClick(sub.subCatId)}
                  className="subcategory-item"
                >
                  <p>{sub.subCatName}</p>
                </div>
              )) || <p>No subcategories available</p>
          }


      </div>
    </div>
  );
};

export default Post_Product02;
