"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { AuthService } from "./services";
import Link from "next/link";

const Home = () => {
  const [user, setUser] = useState<any>(null);
  const authService = AuthService.getInstance();

  useEffect(() => {
    authService
      .getUser()
      .then((res: any) => {
        setUser(res);
        (err: any) => {
          console.log(err);
          setUser(null);
        };
      })
      .catch((err: any) => {
        console.log(err);
        setUser(null);
      });
  }, []);

  return (
    <main className="min-h-screen h-screen w-full">
      {user ? (
        <div className="w-full flex items-center justify-center">
          <h1 className="text-6xl mt-20 w-full flex items-center justify-center font-bold">Welcome {user.name}!</h1>
        </div>
      ) : (
        <>
          <h1 className="text-6xl mt-20 w-full flex items-center justify-center font-bold">
            Welcome to I don't know chatbot
          </h1>
          <Link href="/login" className="text-md text-slate-300 hover:text-white bg-black ml-auto mr-auto w-full">
            Login
          </Link>
        </>
      )}
    </main>
  );
};

export default Home;
