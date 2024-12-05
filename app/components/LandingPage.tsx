import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <section className="relative overflow-hidden min-h-screen flex flex-1 flex-col items-center justify-center">
      <div className="mr-auto pt-4 flex justify-between w-screen">
        <Link href="/auth/login">
          <img src="/img/logo_IDK_IA.png" alt="logo" className="h-20 ml-12 w-auto" />
        </Link>
        <Link href="/auth/login">
          <Button className="text-white mr-12 mt-auto mb-auto">Login</Button>
        </Link>
      </div>
      <div className="mx-auto flex max-w-5xl flex-col items-center mt-[35vh] mb-auto">
        <div className="z-10 flex flex-col items-center gap-6 text-center">
          <div>
            <h1
              className="mb-6 text-2xl font-bold lg:text-5xl"
              style={{
                background: "linear-gradient(120deg, #5391c1, #876bca)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Bienvenue dans I Don't Know AI
            </h1>
            <p className="lg:text-xl text-black/75 mt-2">
              I Don't Know AI est une IA qui permet à l'utilisateur de faire part de sa santé mentale et de maintenir un
              état de santé sain. En gros, c'est comme un médecin, mais sans le stéthoscope !
            </p>
          </div>
          <Link href="/auth/login">
            <Button className="text-white">Get Started</Button>
          </Link>
        </div>
      </div>
      <footer className="bg-[#000000]/85 text-white py-4 mt-auto w-full">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 I don't know. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
}
