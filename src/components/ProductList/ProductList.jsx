import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css";
import Carousel from '../../components/Carousel/Carousel';
<img src="data:image/png;base64,..." alt="Bluetooth Headphones" />


const ProductList = () => {
 const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/product/image")
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
      });
  }, []);

  return (
   <div className="product-grid">
  {products.map((product) => (
    <div key={product.id} className="product-card">
      {/* <img src="http://localhost:8080/api/image/5"/> */}
        {/* <img src={`http://localhost:8080/api/image/${product.imageID}`}/> */}
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
      <div className="product-details">
  <div className="product-text">
    <h3>{product.name}</h3>
    <p>{product.subcategory}</p>
  </div>
  <p className="price">${product.price}</p>
</div>

      <button>Share</button>
    </div>
  ))}
  
</div>

  );
}

export default ProductList