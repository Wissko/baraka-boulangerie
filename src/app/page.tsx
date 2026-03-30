import Navigation from "@/components/ui/Navigation";
import Hero from "@/components/sections/Hero";
import Histoire from "@/components/sections/Histoire";
import Creations from "@/components/sections/Creations";
import Experience from "@/components/sections/Experience";
import Adresses from "@/components/sections/Adresses";
import Instagram from "@/components/sections/Instagram";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Histoire />
      <Creations />
      <Experience />
      <Adresses />
      <Instagram />
      <Footer />
    </main>
  );
}
