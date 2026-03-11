import Image from "next/image";

//import HeroComp from "./components/homeComponents/Hero";
import NewsSection from "./components/homeComponents/News";
import NewsLetter from "./components/homeComponents/NewLetter";
import Slider from "./components/homeComponents/slider/slider";
import ContactForm from "./components/homeComponents/ContactForm";

 export default function Home() {
   return (
    <>
      <section>
        <h1 className="mx-6 text-4xl mb-6 self-start">Welcome to Belive Fitness</h1>

        <NewsSection />

        <NewsLetter />

        <Slider />

        <ContactForm />

      </section>
    </>
   );
 }

