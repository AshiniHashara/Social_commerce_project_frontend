import { useParams } from "react-router-dom";
import {  useEffect, useState } from "react";
import axios from "axios";
import Carousel from '../../components/Carousel/Carousel';
import "./Product_Share_Display.css"
import { useLocation } from "react-router-dom";
import WhatsAppSender from "../../components/WhatsAppSender/WhatsAppSender";

const Product_Share = () => {
  // const { id } = useParams();
  const { id: encodedProductId, retailerId: encodedRetailerId } = useParams();
  const [product, setProduct] = useState(null);
  const location = useLocation();
  const { totalPrice } = location.state || {};

  // ✅ Decode them safely
  const productId = atob(encodedProductId);
  const retailerId = atob(encodedRetailerId);

 const urlToShare = window.location.href;

  const [categoryName, setCategoryName] = useState("");

  const [categories, setCategories] = useState([]);
const [subCategoryName, setSubCategoryName] = useState("");

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

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8080/api/product/image/${productId}`);
  //       setProduct(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Error fetching product:", error);
  //     }
  //   };

  //   fetchProduct();
  // }, [productId]);

  if (!product) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Loading...
      </h2>
    );
  }
  return (
    <>
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
        <button
          className={`cart-btn ${!product.available ? "disabled-btn" : ""}`}
          disabled={!product.available}
        >
          {product.available ? "Add to cart" : "Out of Stock"}
        </button>
        <h6>
          Stock Available:{" "}
          <i style={{ color: "green", fontWeight: "bold" }}>{product.quantity}</i>
        </h6>
        <p className="release-date">
          <h6>Product listed on:</h6>
          <i>{product.release_date}</i>
        </p>
      </div>

      <div className="update-button">
        <WhatsAppSender shareUrl={urlToShare} />
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default Product_Share