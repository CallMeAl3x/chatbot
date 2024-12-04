"use client";

import { useEffect, useState } from "react";
import { AuthService } from "./services";
import { useRouter } from "next/navigation";

const Home = () => {
  const [user, setUser] = useState<any>(null);
  const authService = AuthService.getInstance();
  const router = useRouter();

  useEffect(() => {
    authService
      .getUser()
      .then((res: any) => {
        setUser(res);

        (err: any) => {
          console.log(err);
          setUser(null);
          router.push("/login");
        };
      })
      .catch((err: any) => {
        console.log(err);
        router.push("/login");
        setUser(null);
      });
  }, []);

  return (
    <main className='min-h-screen h-screen w-full'>
      {user && (
        <div className='w-full flex items-center justify-center'>
          <h1 className='text-6xl mt-20 w-full flex items-center justify-center font-bold'>
            Welcome {user.name}!
          </h1>
        </div>
      )}
    </main>
  );
};

export default Home;
