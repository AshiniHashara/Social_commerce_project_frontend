import { useParams } from "react-router-dom";
import {  useEffect, useState } from "react";
import axios from "axios";
import Carousel from '../../components/Carousel/Carousel';
import "./Product_Share.css"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; 
import Navbar from "../../components/Navbar/Navbar";
import { jwtDecode } from "jwt-decode";



const Product_Share = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [margin, setMargin] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const [categories, setCategories] = useState([]);
const [subCategoryName, setSubCategoryName] = useState("");

useEffect(() => {
  
  axios.get("http://localhost:8080/api/category")
    .then((res) => {
      setCategories(res.data);
    })
    .catch((err) => console.error("Category fetch error", err));
}, []);



  const navigate = useNavigate();

  useEffect(() => {
  const fetchProduct = async () => {
  const response = await axios.get(`http://localhost:8080/api/product/image/${id}`);
  setProduct(response.data);

  const subCatId = response.data.subcategory_id;

  
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
}, [id, categories]);

  if (!product) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Loading...
      </h2>
    );
  }

  
const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-GB", {
    year: "numeric",
    month: "short", 
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};


  const handleAddMargin = async () => {
    if (!margin || isNaN(margin) || parseFloat(margin) <= 0) {
    Swal.fire({
      icon: "warning",
      title: "Invalid Margin",
      text: "Please enter a valid margin (positive number) before proceeding.",
    });
    return;
  }
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      Swal.fire("Error", "Please log in first!", "error");
      return;
    }

    
    const decoded = jwtDecode(token);
    const role = decoded.Roles;
    console.log("Decoded token:", decoded);
    console.log("role:", role);

    if (role !== "WHOLESELLER" && role !== "RETAILER") {
      Swal.fire("Access Denied", "You don’t have permission.", "error");
      return;
    }
   const response = await axios.post(
  "http://localhost:8080/api/retailer/margin",
  {
    margin: parseFloat(margin),
    product: { id: product.id },
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    console.log("Margin saved:", response.data);
    Swal.fire({
        title: "Margin Added!",
        icon: "success",
        draggable: true
      });
    //alert("Margin entry added successfully!");
    const retailerId = response.data.retailerId;

    
    const encodedProductId = btoa(product.id.toString());
    const encodedRetailerId = btoa(retailerId.toString());


    // Navigate to new page with product name and total price
    const totalPrice = parseFloat(product.price) + parseFloat(margin);
    localStorage.setItem("totalPrice",totalPrice);
    navigate((`/product/${encodedProductId}/${encodedRetailerId}`), {
      state: {
        totalPrice: totalPrice,
      },
    });

  } catch (error) {
    console.error("Error saving margin:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>'
    });
    //alert("Failed to save margin.");
  }
};


  return (
    <>
    <Navbar/>
      <div className="product-add-margin-container">
  <div className="product-margin-content">

    <div className="product-layout-wrapper">
     
      <div className="left-section">
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

        <div className="margin-container">
          <label className="margin-label">Add Your Margin</label>
          <div className="add-margin">
            <input
              type="text"
              className="margin-input"
              placeholder="Enter your margin"
              value={margin}
              onChange={(e) => setMargin(e.target.value)}
            />
            <button className="add-button" onClick={handleAddMargin}>Add</button>
          </div>
        </div>
      </div>

     
      <div className="right-section">
        <span>{categoryName}</span>
        <h1>{product.name}</h1>
        <h5>{subCategoryName}</h5>
        <p>{product.description}</p>
       
        <div className="product-price">
          <span>{"$" + product.price}</span>
         
          {/* <button>
  {product.quantity <= 0 
    ? "Out of Stock" 
    : `Available: ${product.quantity}`}
</button> */}

          <h6>
            Stock Available: <i style={{ color: "green", fontWeight: "bold" }}>{product.quantity}</i>
          </h6>
          <p className="release-date">
            <h6>Product listed on:</h6>
            {/* <p>{product.release_date}</p> */}
            <i>{formatDateTime(product.release_date)}</i>
          </p>
        </div>
      </div>
    </div>

  </div>
</div>

    </>
  );
};

export default Product_Share