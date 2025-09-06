import React, { useState } from 'react';
import login from '../../components/Assets/login.svg';
import axios from 'axios';
import "./Login_Page.css";
import google from '../../components/Assets/icons8-google.svg';
import facebook from '../../components/Assets/icons8-facebook-logo.svg';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const Login_Page = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/login", loginData);
      const { accessToken, refreshToken, username, role } = res.data;

    // Save tokens to localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("username", username);

    // Display in console
    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);
        console.log("User Name:", username);
    console.log("Role:", role);
      

     localStorage.setItem("role", role);

     navigate("/home");   
    

    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "Welcome back!",
      timer: 2000,
      showConfirmButton: false
    });
    } catch (err) {
      console.error(err);
      Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Please check your username or password."
    });
    }
  };

  return (
    <div className='login-container'>
      <div>
        <img className="image-login" src={login} alt="login" />
      </div>
      <div>
        <form onSubmit={handleLogin}>
          <h2 className='login'>Login</h2>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input type="text" name="username" className="form-control"
              value={loginData.username} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control"
              value={loginData.password} onChange={handleChange} />
          </div>
          <button type="submit" className="btn-signin">Sign in</button>
        </form>

        <div className="divider"><span>OR</span></div>

        <button className="external-btn">
          <img src={google} alt="google" className="external-icon" />
          <span>Log in with Google</span>
        </button>
        <button className="external-btn">
          <img src={facebook} alt="facebook" className="external-icon" />
          <span>Log in with Facebook</span>
        </button>
      </div>
    </div>
  );
};

export default Login_Page;
