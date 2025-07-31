import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css";
import Carousel from '../../components/Carousel/Carousel';
<img src="data:image/png;base64,..." alt="Bluetooth Headphones" />
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";


const ProductList = () => {
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage,setPostsPerPage] = useState(8);

  const navigate = useNavigate();

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

     <button onClick={() => navigate(`/share/${product.id}`)}>Share</button>
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