import Image from "next/image";

import HeroSection from '@/modules/components/Home/HeroSection';
import NewArrivals from '@/modules/components/Home/NewArrivals';

export default function Home() {
  return (
    <main className="">
        <HeroSection />
      <NewArrivals />
      {/* You can add more sections here as you build them */}
    </main>
  );
}
