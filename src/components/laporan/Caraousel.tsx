import React, { useState } from "react";
type Props = {
  children: React.ReactNode;
};

const Carousel: React.FC<Props> = ({ children }) => {
  const slides = React.Children.toArray(children);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-full">
      {/* Kontainer untuk slide dengan overflow hidden */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0">
              {slide}
            </div>
          ))}
        </div>
      </div>

      {/* Tombol navigasi bulat di tengah bawah */}
      <div className="flex gap-1 w-full justify-center mt-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? "bg-gray-600" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Pergi ke slide ${index + 1}`}
          />
        ))}
      </div>


    </div>
  );
};

export default Carousel;
