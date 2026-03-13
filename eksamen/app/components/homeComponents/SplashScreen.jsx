    
    'use client';
    import { useEffect, useState } from "react";
    import Image from "next/image";
    
    //Images:
    const splashImagesrc = ["/assets/splash1.png", "/assets/splash2.png"] 
    const randomIndex = Math.floor(Math.random() * splashImagesrc.length);
    const randomsplashImage = splashImagesrc[randomIndex];


    export default function SplashComp() {
        const [visible, setVisible] = useState(false);
        const [showButton, setShowButton] = useState(false);

        // Splash-visning kun første gang i session og vis knap efter 700 millisek
        useEffect(() => {
            const SplashAlreadyShown = sessionStorage.getItem('SplashAlreadyShown');
            if (!SplashAlreadyShown) {
                setVisible(true);
                document.body.style.overflow = 'hidden';
                setTimeout(() => setShowButton(true), 700);
            }
        }, []);

        function handleStart() {
            sessionStorage.setItem('SplashAlreadyShown', 'true');
            document.body.style.overflow = '';
            setVisible(false);
        }

        if (!visible) return null;

        return (
            <section className="w-full h-[100vh] flex relative z-2000 items-end justify-center fixed top-0 left-0">
                <Image className="h-[100vh] object-cover absolute"
                width={1218} height={812} src={randomsplashImage} alt="splashscreen image"></Image>
                <div className="flex flex-col absolute z-3000 bottom-[200] w-full">
                    <h1 className="ml-8 text-[#F1C40E] text-6xl font-bold">Believe Fitness</h1>
                    <div className="flex self-start">
                        <div className="border-t-2 border-white self-center mr-2 w-7 mx-auto"></div>
                        <h2 className="text-white text-2xl">Train like a pro</h2>
                    </div>
                </div>
                <button
                    onClick={handleStart}
                    className={`self-center mb-10 absolute bottom-[0] mt-10 font-bold text-black bg-[#F1C40E] p-4 px-6 uppercase rounded-full transition-opacity duration-2000
                    ${showButton ? 'opacity-100' : 'opacity-0'}`}>
                    Start training
                </button>
                
            </section>
        )
    }