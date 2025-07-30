import React from 'react'
import "./WhatsAppShareButton.css";

const WhatsAppShareButton = ({ productName, productId, retailerId }) => {
     const productLink = `https://yourdomain.com/product/shared/${productId}?ref=${retailerId}`;
  const message = `Check out this product: ${productName} - ${productLink}`;
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;

  return (
   <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="whatsapp-button">
      Share on WhatsApp
    </a>
  )
}

export default WhatsAppShareButton