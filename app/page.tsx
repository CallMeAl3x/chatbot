"use client";

import { useEffect, useState } from "react";
import { AuthService } from "./services";
import LandingPage from "./components/LandingPage";

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
        <LandingPage />
      )}
    </main>
  );
};

export default Home;
