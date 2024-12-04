"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "../components/Logo";
import { Button } from "../components/ui/button";
import ImageSlider from "../components/ImageSlider";

export default function LandingPage() {
  const [hasScrolled, setHasScrolled] = useState(false); // État pour vérifier si l'utilisateur a scrollé
  const images = [
    { src: "/img/sante_mental.webp", caption: "Santé mentale" },
    { src: "/img/sante_physique.webp", caption: "Santé physique" },
    { src: "/img/sante_medecine.webp", caption: "Santé médicale" },
  ];

  // Gérer l'événement de scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true); // L'utilisateur a scrollé
      } else {
        setHasScrolled(false); // L'utilisateur est en haut de la page
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Nettoyage de l'écouteur d'événement lorsque le composant est démonté
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className='relative overflow-hidden w-full min-h-screen flex flex-col'>
      {/* Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 flex justify-end items-center w-full mx-auto py-7 px-8 bg-white transition-all duration-300 ${
          hasScrolled ? "shadow-lg" : ""
        }`}
      >
        <Logo />
        <Link href='/login'>
          <Button className='text-white mt-auto mb-auto'>Login</Button>
        </Link>
      </div>

      {/* Content */}
      <div className='mx-auto flex max-w-[1200px] flex-col items-center mt-[18vh] px-4 pt-24'>
        <div className='z-10 flex flex-col items-center gap-10 text-center'>
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
          <p className='lg:text-xl text-black/75 mt-2'>
            I Don't Know AI est une IA qui permet à l'utilisateur de faire part
            de sa santé. En gros, c'est comme un médecin, mais sans le
            stéthoscope !
          </p>
          <Link href='/login'>
            <Button className='text-white'>Get Started</Button>
          </Link>
        </div>
        <hr className='border-gray-400 border-t-2 w-1/3 my-32' />
      </div>
      <div className='relative w-full h-[95vh]'>
        <img
          src='/img/medecin_image.webp'
          className='w-full h-full object-cover z-1 blur-sm'
        />
        <div className='absolute inset-0 w-full h-full bg-black opacity-70 z-2'>
          <p>Test</p>
        </div>
      </div>

      {/* Slider */}
      <ImageSlider images={images} />

      {/* Footer */}
      <footer className='bg-[#000000]/85 text-white py-4 mt-auto w-full'>
        <div className='container mx-auto text-center'>
          <p>&copy; 2024 I don't know. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
}
