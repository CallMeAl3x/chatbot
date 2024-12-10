import { auth } from "@/auth";
import { ProtectedLandingPage } from "./(protected)/chat/ProtectedLandingPage";
import LandingPage from "./components/landingPage/page";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return <LandingPage />;
  }

  return <ProtectedLandingPage />;
}
