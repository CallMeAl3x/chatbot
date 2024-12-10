import { LoginButton } from "../auth/login-button";
import { Button } from "../ui/button";

const LandingPage = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 w-screen min-h-screen">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">IDK Chatbot</h1>
        <p className="text-white text-lg">A very simple chatbot</p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg" className="mr-2">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
