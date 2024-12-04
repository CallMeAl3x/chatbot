"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AuthType } from "../types";
import { AuthService } from "../services";
import { Form } from "../components";
import Logo from "../components/Logo";

const LoginPage = () => {
  const authService = AuthService.getInstance();
  const router = useRouter();

  const handleClick = (e: any, data: AuthType) => {
    e.preventDefault();
    const { email, password } = data;

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    authService.loginUser({ email, password }).then(
      (res: any) => {
        toast.success("Login successfull!!");
        router.push("/");
      },
      (err: any) => {
        console.log(err);
        toast.error(err.message);
      }
    );
  };

  return (
    <div className='h-screen w-full py-10 flex flex-col items-center gap-10'>
      <Logo />
      <h1 className='text-7xl font-bold w-full text-center py-5 mb-10'>
        Login
      </h1>
      <Form
        handleClick={handleClick}
        dataFields={[
          {
            name: "email",
            type: "email",
            placeholder: "Email",
          },
          {
            name: "password",
            type: "password",
            placeholder: "Password",
          },
        ]}
        btnTitle='Login'
      />
    </div>
  );
};

export default LoginPage;
