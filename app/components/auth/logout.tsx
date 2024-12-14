import { handleSignOut } from "@/actions/logout";
import { Button } from "../ui/button";

export default function Logout() {
  const handleLogOut = async () => {
    handleSignOut();
    window.dispatchEvent(new Event("session-changed"));
  };
  return (
    <div className="flex justify-center">
      <Button
        onClick={() => handleLogOut()}
        className="bg-red-600 text-white mt-6 w-[90%] rounded-lg h-11 mb-4 font-semibold"
      >
        Sign out
      </Button>
    </div>
  );
}
