import Image from "next/image";

import HeroComp from "./components/homeComponents/Hero";
import NewsSection from "./components/homeComponents/News";
import NewsLetter from "./components/homeComponents/NewLetter";
import Slider from "./components/homeComponents/slider/slider";
import ContactForm from "./components/homeComponents/ContactForm";
import Divider from "./components/homeComponents/Divider";
import Footer from "./components/homeComponents/Footer";

 export default function Home() {
   return (
    <>
      <section>
        <HeroComp />
        
        <NewsSection />

        <Divider />

        <NewsLetter />

        <Slider />

        <ContactForm />

        <Divider />

        <Footer />

      </section>
    </>
   );
 }

