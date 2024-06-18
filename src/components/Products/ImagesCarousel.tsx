import React, { useState } from "react";

interface ImagesCarouselProps {
  images: readonly string[];
  className?: String; 
}

const ImagesCarousel: React.FC<ImagesCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full mb-4">
      <div className="overflow-hidden drop-shadow-custom">
        <img
          src={images[currentIndex]}
          alt={`Product image ${currentIndex + 1}`}
          className="w-full max-h-60 min-h-60 object-cover rounded-xl "
        />
      </div>
      <button
        onClick={handlePrevClick}
        className="absolute top-1/2 left-0 transform -translate-y-1/2  bg-opacity-50 text-white px-2 py-1"
      >
        {"<"}
      </button>
      <button
        onClick={handleNextClick}
        className="absolute top-1/2 right-0 transform -translate-y-1/2  bg-opacity-50 text-white px-2 py-1"
      >
        {">"}
      </button>
    </div>
  );
};

export default ImagesCarousel;
