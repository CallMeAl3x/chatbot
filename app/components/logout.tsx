import { signOut } from "@/auth";
import { Button } from "./ui/button";

const Logout = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/", redirect: true });
      }}
    >
      <div className="flex justify-center">
        <Button type="submit" className="bg-red-600 text-white mt-6 w-[90%] rounded-lg h-8 mb-4">
          Sign out
        </Button>
      </div>
    </form>
  );
};

export default Logout;
