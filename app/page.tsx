import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";
import HeroSection from "@/app/_components/home/HeroSection";
import About from "@/app/_components/home/About";
import Courses from "@/app/_components/home/Courses";
import Location from "@/app/_components/home/Location";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main>
        <HeroSection />
        <About />
        <Courses />
        <Location />
      </main>

      <Footer />
    </div>
  );
}
