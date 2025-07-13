import React, { useState, useRef } from "react";

import { auth, db, storage } from "@firebaseApp";
import { UserContext } from "@contexts";
import { t, s, r, img } from "@res";
import { timeAgo } from "@utils";
import { Editor, EditorState, ContentState, CompositeDecorator } from "draft-js";

export default function Swipe() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const images = [
    img.banner_01,
    img.banner_02,
    img.banner_03,
  ];

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 75) {
      goToNext();
    }
    if (touchStartX.current - touchEndX.current < -75) {
      goToPrevious();
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out w-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 bg-white flex flex-col justify-center items-center w-full">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="max-w-[50%] w-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = img.thumb_default;
                }}
              />
            </div>
          ))}
        </div>

        <button
          onClick={goToPrevious}
          className="absolute top-1/2 left-0 -translate-y-1/2 p-3 rounded-full transition-all duration-300 text-red-400"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute top-1/2 right-0 -translate-y-1/2 p-3 rounded-full transition-all duration-300 text-red-400"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 bg-white/50 p-1">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                currentIndex === index ? "bg-red-400" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
