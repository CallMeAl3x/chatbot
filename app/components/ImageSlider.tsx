import React, { useState, useRef } from "react";

const ImageSlider = ({
  images,
}: {
  images: { src: string; caption: string }[]; // Mise à jour du type des images
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isScrolling = useRef(false);

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!e.shiftKey) return; // L'utilisateur doit maintenir la touche Maj

    const isScrollingDown = e.deltaY > 0;

    if (isScrolling.current) {
      e.preventDefault();
      return;
    }

    if (
      (isScrollingDown && currentIndex < images.length - 1) ||
      (!isScrollingDown && currentIndex > 0)
    ) {
      e.preventDefault();
      setCurrentIndex((prevIndex) =>
        isScrollingDown
          ? Math.min(prevIndex + 1, images.length - 1)
          : Math.max(prevIndex - 1, 0)
      );

      isScrolling.current = true;
      setTimeout(() => {
        isScrolling.current = false;
      }, 500); // Temps identique à la durée de transition
    }
  };

  return (
    <div className='relative ml-10'>
      {/* Slider */}
      <div
        className='flex gap-6 transition-transform duration-500'
        style={{
          transform: `translateX(-${currentIndex * 96}%)`,
        }}
        onWheel={handleScroll} // Ajout du gestionnaire de défilement
      >
        {/* Ajout des images */}
        {images.map((image, index) => (
          <div
            key={index}
            className='relative w-[95%] h-[83vh] flex-shrink-0 rounded-xl overflow-hidden bg-slate-800'
          >
            <img
              src={image.src}
              alt={`Slide ${index + 1}`}
              className='w-full h-full object-cover rounded-xl opacity-80 transition-opacity duration-300 hover:opacity-50'
            />
            <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 transition-opacity ease-in duration-250 hover:opacity-100'>
              <p className='text-white text-lg font-bold'>{image.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Flèche gauche */}
      {currentIndex > 0 && (
        <button
          className='absolute top-1/2 left-10 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-12 h-12 rounded-full flex items-center justify-center z-2 hover:bg-opacity-80'
          onClick={() =>
            setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
          }
          aria-label='Image précédente'
        >
          &#10094;
        </button>
      )}

      {/* Flèche droite */}
      {currentIndex < images.length - 1 && (
        <button
          className='absolute top-1/2 right-20 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-12 h-12 rounded-full flex items-center justify-center z-2 hover:bg-opacity-80'
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              Math.min(prevIndex + 1, images.length - 1)
            )
          }
          aria-label='Image suivante'
        >
          &#10095;
        </button>
      )}

      {/* Points de navigation */}
      <div className='absolute bottom-4 left-[48%] transform -translate-x-1/2 flex gap-2'>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full bg-white transition-all duration-300 ${
              currentIndex === index ? "bg-opacity-100" : "bg-opacity-50"
            }`}
            aria-label={`Go to image ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
