import LandingPage from "@/components/home/Landing";
import { getHealth } from "@/lib/healthApi";

export default async function Home() {
  const health = await getHealth();
  return (
    <div>
      <LandingPage />
    </div>
  );
}
