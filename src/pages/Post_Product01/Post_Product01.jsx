import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import "./Post_Product01.css"
import { category_list } from '../../components/Assets/assets'
import Navbar from '../../components/Navbar/Navbar'

const Post_Product01 = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const storedCategory = localStorage.getItem("selectedCategory");
        if(storedCategory){
            setSelectedCategory(storedCategory);
        }
    } ,[]); 

    const handleCateoryClick = (item) => {
        setSelectedCategory(item.category_name);
        localStorage.setItem("selectedCategory",item.category_name);

        navigate(`/post02/${item.category_name}`);
    };
  return (
    <div className='select-category'>
        <Navbar />
        <h1>Welcome Anne!</h1>
        <p>Choose an option below to post an Product</p>
        <div className='select-categories-container' id='select-category'>
                {category_list.map((item,index)=>{
                    return (
                        <div key={index} onClick={() => handleCateoryClick(item)} className='select-category-item'>
                            <img src={item.category_image} className="select-category-image" alt=''/>
                            <p>{item.category_name}</p>
                        </div>
                    )
                })}
            </div>
    </div>
  )
}

export default Post_Product01