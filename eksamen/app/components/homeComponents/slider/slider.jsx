'use client'
import useEmblaCarousel from 'embla-carousel-react';
import { getTestimonials } from "./slider-fetch";
import { useEffect, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import { IoChevronBackCircleOutline } from "react-icons/io5";
import { IoChevronForwardCircleOutline } from "react-icons/io5";


export default function Slider() {

//   const [emblaRef, emblaApi] = useEmblaCarousel();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]); // npm install embla-carousel-autoplay

  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
  if (emblaApi) {
    // eslint-disable-next-line no-console
    console.log('emblaApi:', emblaApi);
  }
}, [emblaApi]);

    useEffect(() => {
        async function fetchTestimonials() {
            const testimonials = await getTestimonials();
            setTestimonials(testimonials);
        }
        fetchTestimonials();
    }, []);

    // const goToPrev = () => emblaApi?.goToPrev() //nyere version, men kan ikke installere den i min react-version
    // const goToNext = () => emblaApi?.goToNext() //nyere version, men kan ikke installere den i min react-version
    // ældre version er scrollPrev/scrollNext, og hjælp til sammenligning mellem versioner: https://github.com/davidjerleke/embla-carousel/discussions/1080

    // Brug scrollPrev/scrollNext, da din emblaApi ikke har goToPrev/goToNext
    const goToPrev = () => emblaApi && typeof emblaApi.scrollPrev === 'function' && emblaApi.scrollPrev();
    const goToNext = () => emblaApi && typeof emblaApi.scrollNext === 'function' && emblaApi.scrollNext();

    return (
        <section className="embla mb-8 flex flex-col items-center justify-center">
            <div className="relative w-full">
            <Image width={1218} height={812} src="/assets/splash1.png" className="relative max-w-full h-auto object-cover" alt="Hero image" />
            <div className='bg-black/50 w-full h-auto inset-0 absolute z-10'></div>
            </div>
            <h2 className="absolute z-100 mb-50 text-white mx-6 text-2xl w-[60%] text-center font-[600]">A word from other Believers</h2>
            <div className="absolute z-200 embla w-full overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex" >
                    {testimonials.map((testimonial, idx) => (
                        <article className="mt-5 text-white embla__slide flex-[0_0_100%] flex flex-col items-center justify-center" key={idx}>
                            <p className="mx-6 text-m w-full max-w-xl text-center font-[400] mb-4  px-16">{testimonial.text}</p>
                            <p className="mx-6 text-md w-full max-w-xl text-center font-[700]">{testimonial.name}</p>
                        </article>
                    ))}
                </div>
            </div>
            <div className="absolute mt-60 z-100 text-white flex cursor-pointer">
            <button disabled={!emblaApi} className="embla__prev" onClick={goToPrev}><IoChevronBackCircleOutline size={55}/></button>
            <button disabled={!emblaApi} className="embla__next" onClick={goToNext}><IoChevronForwardCircleOutline size={55}/></button>
            </div>
        </section>
    )

}