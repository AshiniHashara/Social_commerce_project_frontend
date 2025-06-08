import React from 'react'
import "./Category.css"
import { category_list } from '../Assets/assets'
import Navbar from '../Navbar/Navbar'
import ProductList from '../ProductList/ProductList'
const Category = () => {
  return (
    <div>
        <Navbar/>
    <div className='categories-container' id='explore-category'>
        {category_list.map((item,index)=>{
            return (
                <div key={index} className='category-item'>
                    <img src={item.category_image} className="category-image" alt=''/>
                    <p>{item.category_name}</p>
                </div>
            )
        })}
    </div>
    <ProductList/>
    </div>
  )
}

export default Category