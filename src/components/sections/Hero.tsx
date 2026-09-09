import { getHomeHero } from "@/content/repository";
import { HeroAnimated } from "./HeroAnimated";

export async function Hero() {
  const hero = await getHomeHero();
  return <HeroAnimated hero={hero} />;
}
