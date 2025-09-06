import React, { useState } from 'react';
import signup from '../../components/Assets/SignUp.svg';
import axios from 'axios';
import "./SignUp.css";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    mobile: "",
    role: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/Register", formData);
      Swal.fire({
            icon: "success",
            title: "Registration Successful",
            text: "Please Log in!",
            timer: 2000,
            showConfirmButton: false
          });
      console.log(res.data);
      navigate("/login")
    } catch (err) {
      console.error(err);
      Swal.fire({
           icon: "error",
           title: "Registration Failed",
           text: "Please check your details."
         });
    }
  };

  return (
    <div className='login-container'>
      <div>
        <img className="image-login" src={signup} alt="signup" />
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <h2 className='login'>Register</h2>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input type="text" name="name" className="form-control"
              value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input type="text" name="username" className="form-control"
              value={formData.username} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input type="text" name="mobile" className="form-control"
              value={formData.mobile} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Select Role</label>
            <select name="role" className="form-control"
              value={formData.role} onChange={handleChange}>
              <option value="" disabled>Select Role</option>
              <option value="RETAILER">Retailer</option>
              <option value="WHOLESELLER">Wholeseller</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control"
              value={formData.password} onChange={handleChange} />
          </div>
          <button type="submit" className="btn-signin">Register</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
