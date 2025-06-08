import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import "./Post_Product01.css"
import { category_list } from '../../components/Assets/assets'
import Navbar from '../../components/Navbar/Navbar'
import axios from "axios";

const Post_Product01 = () => {

    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/category")
        .then(res => {
            setCategory(res.data);
        })
        .catch(err => {
            console.error("Error fetching products:", err);
        });
    }, []);

    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const storedCategory = localStorage.getItem("selectedCategory");
        if(storedCategory){
            setSelectedCategory(storedCategory);
        }
    } ,[]); 

    const handleCateoryClick = (item) => {
        setSelectedCategory(item.name);
        localStorage.setItem("selectedCategory",item.id);

        navigate(`/post02/${item.name}`);
    };
  return (
    <div className='select-category'>
        <Navbar />
        <h1>Welcome Anne!</h1>
        <p>Choose an option below to post an Product</p>
        <div className='select-categories-container' id='select-category'>
                     {category.map((item,index)=>{
                    return (
                        <div key={index} onClick={() => handleCateoryClick(item)} className='select-category-item'>
                            {/* <img src={item.category_image} className="select-category-image" alt=''/> */}
                            <p>{item.name}</p>
                        </div>
                    )
                })}

            </div>
    </div>
  )
}

export default Post_Product01