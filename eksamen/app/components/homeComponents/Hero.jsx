    
    'use client';
    import { useEffect, useState } from "react";
    import Link from "next/link";
    import Image from "next/image";


    export default function HeroComp() {
    
    // Tjek for om der er en accessToken-cookie, og om den er gyldig (ikke udløbet)
    //find cookie, der hedder accessToken, og giv mig dens indhold
    function isTokenExpired() {
        const match = document.cookie.match(/accessToken=([^;]+)/);
        if (!match) return true; // ingen token = ikke logget ind

        const token = match[1]; // index 1 af match er det faktiske token, det efter "accessToken="
        try {
        const payload = JSON.parse(atob(token.split('.')[1])); // decode payload-delen af JWT'en og parse den som JSON - atob() er en browserfunktion, der dekoder en base64-kodet streng
        if (!payload.exp) return true;
        return Date.now() / 1000 > payload.exp;
        } catch {
        return true;
        }
    }

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(document.cookie.includes('accessToken=') && !isTokenExpired());
    }, []);


    return (
      <section className="w-full h-[auto] relative mb-8">
        <div className='bg-black/40 w-full h-auto inset-0 absolute z-10'></div>
        <Image width={1499} height={1000} className="aspect-4/3 inset-0 object-cover w-full" src="/assets/welcome.jpg" alt="Hero Image" />
        
        <div className="flex flex-col absolute inset-0 justify-end mb-8">
          <h1 className="z-11 mx-6 text-[#F1C40E] font-bold text-5xl mb-6">Welcome to Belive Fitness</h1>
          <div className="flex gap-2 px-6 items-end">
            
                <Link href="/classes"
                className="flex bg-[#F1C40E] font-bold uppercase text-sm items-center p-4 rounded-full z-11 h-[53px] max-w-[300px] px-8 self-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] leading-none relative align-end">
                Classes
              </Link>
            {!loggedIn ? (
              <Link href="/login"
                className="flex bg-[#F1C40E] font-bold uppercase text-sm items-center p-4 rounded-full z-11 h-[53px] max-w-[300px] px-8 self-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] leading-none relative align-end">
                Log ind
              </Link>
            ) : (
              <Link href="/profil"
                className="flex bg-[#F1C40E] font-bold uppercase text-sm items-center p-4 rounded-full z-11 h-[53px] max-w-[300px] px-8 self-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] leading-none relative align-end">
                Profile
              </Link>
            )}
          </div>   
        </div>
     </section>
    )
    }