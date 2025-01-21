import { auth } from "@/auth";
import LandingPage from "@/components/landingPage/page";
import { ProtectedLandingPage } from "./(protected)/chat/ProtectedLandingPage";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return <LandingPage />;
  }

  return <ProtectedLandingPage />;
}
