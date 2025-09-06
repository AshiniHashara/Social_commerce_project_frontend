import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css";
<img src="data:image/png;base64,..." alt="Bluetooth Headphones" />
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import { jwtDecode } from "jwt-decode";



const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage,setPostsPerPage] = useState(8);

  const navigate = useNavigate();
  
  //both wholeseller and retailer can share product but want to log in
const handleShare = (id) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    alert("Please log in to share this product.");
    navigate("/login");
    return;
  }

  try {
    const decoded = jwtDecode(accessToken);
    console.log(decoded.Roles); 
    const roles = decoded.Roles || [];

    // allow only wholeseller or retailer
    if (roles.includes("WHOLESELLER") || roles.includes("RETAILER")) {
      navigate(`/share/${id}`);
    } else {
      alert("You do not have permission to share this product.");
    }
  } catch (err) {
    console.error("Error decoding token:", err);
    alert("Invalid token, please log in again.");
    navigate("/login");
  }
};


  useEffect(() => {
    axios.get("http://localhost:8080/api/product/image")
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = products.slice(firstPostIndex,lastPostIndex)

  return (
   <div className="product-grid">
      {currentPosts.map((product) => (
        <div key={product.id} className="product-card">
        {product.imageID && product.imageID.length > 0 && (
      <img
        className="product-image"
        src={`http://localhost:8080/api/image/${product.imageID[0]}`}
        alt={product.name}
      />
    )}

        <div className="product-details">
          <div className="product-text">
              <h3>{product.name}</h3>
              <p>{product.subcategory}</p>
          </div>
          <p className="price">${product.price}</p>

       
  </div>

    <button onClick={() => handleShare(product.id)}>Share</button>

    </div>
  ))}
   <Pagination 
   totalPosts={products.length}
   postsPerPage={postsPerPage}
   setCurrentPage={setCurrentPage}
   currentPage={currentPage}/>
</div>

  );
}

export default ProductList