import Hero from "../sections/Hero";
import Stats from "../sections/Stats";
import KeepFocused from "../sections/KeepFocused";
import ServicesSlider from "../sections/ServicesSlider";
import WhyUs from "../sections/WhyUs";
import Testimonials from "../sections/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <KeepFocused />
      <ServicesSlider />
      <WhyUs />
      <Testimonials />
    </>
  );
}
