import { HydrateClient } from "@/trpc/server";
import LandingPage from "@/app/_components/LandingPage";

export default async function Home() {

  return (
    <HydrateClient>
      <LandingPage />
    </HydrateClient>
  );
}
