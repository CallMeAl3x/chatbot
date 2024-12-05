"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "../components/Logo";
import { Button } from "../components/ui/button";
import ImageSlider from "../components/ImageSlider";

export default function Home() {
  const [hasScrolled, setHasScrolled] = useState(false); // Vérifie si l'utilisateur a scrollé
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true); // Vérifie si c'est la première visite
  const [showArrowDown, setShowArrowDown] = useState(true);
  const [showArrowUp, setShowArrowUp] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null); // Référence vers l'image cible

  const images = [
    {
      src: "/img/sante_mental.webp",
      caption:
        "I Don't Know AI propose de nombreuses solutions en ce qui concerne votre santé mental. Elle saura vous conseigner sur les marches à suivre et vous soutiendra tout au long de vos problèmes de santé.",
    },
    { src: "/img/sante_physique.webp", caption: "Santé physique" },
    { src: "/img/recette_gm.webp", caption: "Santé médicale" },
  ];

  const goToTop = () => {
    const preventScroll = (e: WheelEvent | TouchEvent) => {
      setTimeout(() => {
        e.preventDefault();
      }, 100);
    };
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    }, 400);
  };

  const goToImage = () => {
    const preventScroll = (e: WheelEvent | TouchEvent) => {
      setTimeout(() => {
        e.preventDefault();
      }, 100);
    };
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    const targetElement = targetRef.current;
    if (targetElement) {
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offset = 80;
      window.scrollTo({
        top: targetPosition - offset,
        behavior: "smooth",
      });
    }
    // targetRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      setIsFirstVisit(false); // Désactiver après la première redirection
    }, 400);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }

      // Défilement automatique uniquement si l'utilisateur vient d'arriver
      if (isFirstVisit && window.scrollY > window.innerHeight * 0.25) {
        goToImage();
      }

      // Affichage de la flèche si l'utilisateur est en haut de la page
      if (window.scrollY < window.innerHeight * 0.25) {
        setShowArrowDown(true);
        setShowArrowUp(false);
      } else {
        setShowArrowUp(false);
        setShowArrowUp(true);
      }

      if (window.scrollY == 0) {
        setIsFirstVisit(true); // Désactiver après la première redirection
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFirstVisit]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={sectionRef}
      className='bg-[linear-gradient(to_bottom,_var(--tw-gradient-stops))] from-white to-slate-600 relative overflow-hidden w-full min-h-screen flex flex-col'
    >
      {/* Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 flex justify-end items-center w-full mx-auto py-7 px-8 transition-all duration-300 ${
          hasScrolled ? "shadow-lg bg-white" : "bg-transparent"
        }`}
      >
        <Logo />
        <Link href='/dashboard'>
          <Button className='text-white mt-auto mb-auto'>Get Started</Button>
        </Link>
      </div>

      {/* Content */}
      <div className='mx-auto flex max-w-[1200px] flex-col items-center mt-[18vh] px-4 pt-24'>
        <div className='z-10 flex flex-col items-center gap-[9vh] text-center'>
          <h1
            className='text-2xl font-bold lg:text-5xl'
            style={{
              background: "linear-gradient(120deg, #5391c1, #876bca)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Bienvenue dans I Don't Know AI
          </h1>
          <p className='lg:text-xl text-black/75 max-w-[65vw] font-medium'>
            I Don't Know AI est une IA qui permet à l'utilisateur de faire part
            de sa santé. En gros, c'est comme un médecin, mais sans le
            stéthoscope !
          </p>
          <Link href='/auth/login'>
            <Button className='text-white'>Get Started</Button>
          </Link>
        </div>
        <hr className='border-gray-400 border-t-4 rounded-lg w-2/4 mt-[16vh]' />
      </div>

      <div className='w-full py-[18vh]'>
        <div
          ref={targetRef}
          className='relative w-full h-[95vh] mt-[6vh] mb-[18vh]'
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <img
            src='/img/medecin_image.webp'
            className='w-full h-[95vh] object-cover z-1'
          />
          <div
            className='absolute flex flex-row items-center inset-0 w-full h-full pt-1 bg-black opacity-80 z-2'
            style={{
              maskImage: isHovering
                ? `radial-gradient(circle 250px at ${cursorPosition.x}px ${cursorPosition.y}px, transparent 1%, black)`
                : undefined,
              WebkitMaskImage: isHovering
                ? `radial-gradient(circle 250px at ${cursorPosition.x}px ${cursorPosition.y}px, transparent 1%, black)`
                : undefined,
            }}
          >
            <p className='z-3 text-white text-2xl ml-[5vw] max-w-[50vw]'>
              La santé est très importante à nos yeux et il est de mise de
              répondre au mieux à nos utilisateurs en ce qui concerne leur
              santé.
              <br />
              <br />I Don't Know AI propose donc différents chats, chacun se
              focalisant sur une spécialité de la santé...
            </p>
          </div>
        </div>
        {/* Slider */}
        <ImageSlider images={images} />
      </div>

      {/* Flèche en bas à droite */}
      {showArrowDown && (
        <button
          onClick={goToImage} // Appel de la fonction de défilement
          className='fixed bottom-4 right-4 w-12 h-12 bg-gray-800 text-white rounded-full shadow-lg flex items-center justify-center focus:outline-none hover:bg-gray-700 transition-colors'
        >
          ↓
        </button>
      )}

      {showArrowUp && (
        <button
          onClick={goToTop} // Appel de la fonction de défilement
          className='fixed bottom-4 right-4 w-12 h-12 bg-gray-200 text-gray-800 rounded-full shadow-lg flex items-center justify-center focus:outline-none hover:bg-gray-400 transition-colors'
        >
          ↑
        </button>
      )}

      {/* Footer */}
      <footer className='bg-[#000000]/85 text-white py-4 mt-auto w-full'>
        <div className='container mx-auto text-center'>
          <p>&copy; 2024 I don't know. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
}
