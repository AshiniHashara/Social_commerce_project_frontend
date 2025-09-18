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

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = (values) => {
    let errors = {};

     const phoneRegex = /^[0-9]{10}$/;

    if(!values.name){
      errors.name = 'Name is required'
    }
     if (!values.username) {
      errors.username = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.username)) {
      errors.username = 'Email address is invalid';
    }
    if(!values.mobile) {
      errors.mobile = 'Phone Number is required'
    } else if (!phoneRegex.test(values.mobile)) {
       errors.mobile = 'Phone number must be 10 digits';
    }

    if(!values.role) {
      errors.role = 'Role is required'
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    return errors;

  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
     const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return; 
    }

    setIsSubmitting(true);

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
            <input type="text" name="name" className="form-control" placeholder='Enter name'
              value={formData.name} onChange={handleChange} />
               {errors.name && <p className='input-error'>{errors.name}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input type="text" name="username" className="form-control" placeholder='Enter Email'
              value={formData.username} onChange={handleChange} />
               {errors.username && <p className='input-error'>{errors.username}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input type="text" name="mobile" className="form-control" placeholder='Enter Phone number'
              value={formData.mobile} onChange={handleChange} />
               {errors.mobile && <p className='input-error'>{errors.mobile}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Select Role</label>
            <select name="role" className="form-control"
              value={formData.role} onChange={handleChange}>
              <option value="" disabled>Select Role</option>
              <option value="RETAILER">Retailer</option>
              <option value="WHOLESELLER">Wholeseller</option>
            </select>
            {errors.role && <p className='input-error'>{errors.role}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control" placeholder='Enter Strong Password'
              value={formData.password} onChange={handleChange} />
               {errors.password && <p className='input-error'>{errors.password}</p>}
          </div>
          <button type="submit" className="btn-signin">Register</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
