import React, { useEffect, useState } from 'react'
import { CgChevronLeft, CgChevronRight } from 'react-icons/cg'
import "./Carousel.css"
const Carousel = ({ children: slides, autoSlide = false, autoSlideInterval = 3000, }) => {

    const [current,setCurrent] = useState(0);
    const previous = () =>
        setCurrent((current) => (current === 0 ? slides.length - 1 : current - 1 ))
    const next = () =>
        setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1 ))

    useEffect(() =>{
        if(!autoSlide) return;
        const slideInterval = setInterval(next, autoSlideInterval);
        return () => clearInterval(slideInterval);
    }, [autoSlide, autoSlideInterval, next])
  return (
    <div className="carousel-container">
    <div className="carousel-slide">
        {slides.map((slide, index) =>(
            <div
            key={index}
            className={`carousel-item ${index === current ? "active" : ""}`}
            >
                {slide}
            </div>
        ))}
        </div>

    
    <button className="carousel-btn left" onClick={previous}>
        <CgChevronLeft />
    </button>
    <button className="carousel-btn right" onClick={next}>
        <CgChevronRight />
    </button>
    
    <div className="carousel-indicators">
        {slides.map((_, index) => (
            <div
                key={index}
                className={`dot ${index === current ? "active" : ""}`}
                onClick={() => setCurrent(index)}
            ></div>
        ))}
    </div>
    </div>
  );
};

export default Carousel