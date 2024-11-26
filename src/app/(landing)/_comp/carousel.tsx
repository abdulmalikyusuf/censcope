"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel() {
    const settings = {
        speed: 500,
        fade: true,
        infinite: true,
        autoplay: true,
        cssEase: "linear",
        autoplaySpeed: 3000,
    };

    return (
        <section id="carousel" className="h-screen bg-dark">
            <Slider {...settings}>
                <div className="h-screen flex items-center justify-center bg-light">
                    <h1 className="text-dark text-3xl">Slide 1</h1>
                </div>
                <div className="h-screen flex items-center justify-center bg-primary">
                    <h1 className="text-white text-3xl">Slide 2</h1>
                </div>
                <div className="h-screen flex items-center justify-center bg-secondary">
                    <h1 className="text-white text-3xl">Slide 3</h1>
                </div>
            </Slider>
        </section>
    );
}
