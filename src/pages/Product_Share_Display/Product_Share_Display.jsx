import { useParams } from "react-router-dom";
import {  useEffect, useState } from "react";
import axios from "axios";
import Carousel from '../../components/Carousel/Carousel';
import "./Product_Share_Display.css"
import { useLocation } from "react-router-dom";
import WhatsAppSender from "../../components/WhatsAppSender/WhatsAppSender";
import Button from "../../components/Button/Button";
import Navbar from "../../components/Navbar/Navbar";

const Product_Share = () => {
  // const { id } = useParams();
  const { id: encodedProductId, retailerId: encodedRetailerId } = useParams();
  const [product, setProduct] = useState(null);
  const location = useLocation();
  //const { totalPrice } = location.state || {};
  const [username, setUsername] = useState(null);

  const totalPrice = localStorage.getItem("totalPrice");

  // ✅ Decode them safely
  const productId = atob(encodedProductId);
  const retailerId = atob(encodedRetailerId);

 const urlToShare = window.location.href;

  const [categoryName, setCategoryName] = useState("");

  const [categories, setCategories] = useState([]);
const [subCategoryName, setSubCategoryName] = useState("");

useEffect(() => {
        // Check if user info is in localStorage
        const storedUser = localStorage.getItem("username");
        if (storedUser) {
            setUsername(storedUser);
        }
    }, []);

useEffect(() => {
  // Fetch all categories once
  axios.get("http://localhost:8080/api/category")
    .then((res) => {
      setCategories(res.data);
    })
    .catch((err) => console.error("Category fetch error", err));
}, []);

useEffect(() => {
  const fetchProduct = async () => {
  const response = await axios.get(`http://localhost:8080/api/product/image/${productId}`);
  setProduct(response.data);

  const subCatId = response.data.subcategory_id;

  // Find the category that contains this subcategory
  const foundCategory = categories.find(cat =>
    cat.subCategory.some(sub => sub.subCatId === subCatId)
  );

  if (foundCategory) {
    setCategoryName(foundCategory.name);

    const foundSubCat = foundCategory.subCategory.find(sub => sub.subCatId === subCatId);
    if (foundSubCat) {
      setSubCategoryName(foundSubCat.subCatName);
    }
  }
};


  fetchProduct();
}, [productId, categories]);

  if (!product) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Loading...
      </h2>
    );
  }
  return (
    <>
    <Navbar/>
      <div className="containers">
  <div className="product-content-wrapper">
    
    {/* LEFT SIDE – Image Carousel */}
    <div className="left-column">
      {product.imageID && product.imageID.length > 0 && (
        <Carousel
          showThumbs={false}
          infiniteLoop
          showStatus={false}
          autoPlay
          interval={3000}
          className="product-carousel"
        >
          {product.imageID.map((id) => (
            <div key={id}>
              <img
                className="product-image"
                src={`http://localhost:8080/api/image/${id}`}
                alt={product.name}
              />
            </div>
          ))}
        </Carousel>
      )}
    </div>

    {/* RIGHT SIDE – Product Details */}
    <div className="right-column">
      <div className="product-description">
        <span>{categoryName}</span>
        <h1>{product.name}</h1>
        <h5>{subCategoryName}</h5>
        <p>{product.description}</p>
      </div>

      <div className="product-price">
        <span>{"$" + totalPrice}</span>
      </div>

<div className='buttons'>
                {username ? (
      <div className="update-button">
        <WhatsAppSender shareUrl={urlToShare} />
      </div>
  ) : (
      <>
          <Button className="buy-button" value="Buy Product" />
          <Button className="add-button" value="Add To Cart" />
      </>
  )}
</div>

    </div>
  </div>
</div>

    </>
  );
};

export default Product_Share