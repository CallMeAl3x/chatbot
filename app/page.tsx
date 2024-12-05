import { Navbar } from "./components/landing-page/Navbar";
import { Hero } from "./components/landing-page/Hero";
import { LogoTicker } from "./components/landing-page/LogoTicker";
import { Features } from "./components/landing-page/Features";
import { ProductShowcase } from "./components/landing-page/ProductShowcase";
import { FAQs } from "./components/landing-page/FAQs";
import { CallToAction } from "./components/landing-page/CallToAction";
import { Footer } from "./components/landing-page/Footer";
import { Pricing } from "./components/landing-page/Pricingdemo";


export default function LandingPage() {
  return (
    <>
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <LogoTicker />
      
      <Features />
      
      <ProductShowcase />
      <FAQs />
      <Pricing/>
     
      {/* <CallToAction /> */}
      </div>
      <Footer />
    </>
  );
}
