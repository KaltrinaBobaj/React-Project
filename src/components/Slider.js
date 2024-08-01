import React from 'react'
import slides from "../data/slides";
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

function Slider() {
  return (
    <Carousel className="text-centerl">
    {slides && slides.map(slide =><Carousel.Item key={slide.id}><Image src={slide.src} alt={slide.alt} /></Carousel.Item>)}
    </Carousel>
  )
}

export default Slider
