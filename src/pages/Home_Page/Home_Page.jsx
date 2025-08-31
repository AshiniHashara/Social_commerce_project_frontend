import React, { useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar'
import Category from '../../components/Category/Category'
import ProductList from '../../components/ProductList/ProductList'
import Cart from '../../components/Cart/Cart'
//import image1 from '../../../../Assets/Emails-bro.png'
import Button from '../../components/Button/Button'
import image1 from '../../components/Assets/Emails-bro.png';
import image2 from '../../components/Assets/Refer a friend-bro.png'
import { useNavigate } from 'react-router-dom';



const Home_Page = () => {
    const navigate = useNavigate();
    const productListRef = useRef(null); // create a reference

    const scrollToProductList = () => {
        productListRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

  return (
    <div>
        <Navbar/>
        <Category/>
        <div ref={productListRef}>
                <ProductList />
        </div>

        <Cart 
            className="post" 
            description="Join the Movement
            List your product directly on FlipBiz, connect with motivated retailers, and expand your reach. No middleman, just pure business.
            It’s your turn to grow — Post Your Product Now!"
            img={image1} 
            value="Post Your Product" 
            onClick={()=> navigate("/post01")}
        />

        <Cart
            className="share"
            description="Start Selling Smarter
            Discover trending wholesale deals, set your profit margin, and share your unique link across social media.
            With FlipBiz, every share is a sale waiting to happen.
            Share a Product & Earn Instantly!"
            img={image2}
            value="Share Product"
            onClick={scrollToProductList}
        />
    </div>

  )
}

export default Home_Page