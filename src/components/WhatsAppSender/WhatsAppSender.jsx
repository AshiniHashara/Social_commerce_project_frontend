import React, { useState } from "react";
import axios from "axios";
import "./WhatsAppSender.css"; 

const WhatsAppSender = ({ shareUrl }) => {
  const [message, setMessage] = useState("");

const handleSend = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please log in first!");
      return;
    }

    const message = shareUrl;
    const res = await axios.post(
      "http://localhost:8080/api/whatsapp",
      { message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const whatsappUrl = res.data.url;
    window.open(whatsappUrl, "_blank");
  } catch (err) {
    console.error("Error generating WhatsApp link", err);
  }
};


  return (
    <div className="whatsapp-sender">
      <button
        className="whatsapp-button"
        onClick={handleSend}
      >
        Send via WhatsApp
      </button>
    </div>
  );
};

export default WhatsAppSender;
