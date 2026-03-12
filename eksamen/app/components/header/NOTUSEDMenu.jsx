'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogOutBtn from "../LogOut/LogOutBtn";
// import { useContext } from 'react';
// import { AuthContext } from '../lib/authcontext';

// import { useEffect, useState } from "react";


function isActive(path, currentPath) {
    return path === currentPath ? "text-black" : "text-[#6F6F6F]";
}

export default function Menu( {state} ) {
    // const { loggedIn } = useContext(AuthContext);
    const pathname = usePathname();

    // const [loggedIn, setLoggedIn] = useState(false);

    // useEffect(() => {
    //     setLoggedIn(document.cookie.includes('accessToken='));
    // }, []);
    
    //const profilMenuText = loggedIn ? "Profil" : "Log ind";

    return (
        <nav className={state ? "flex fixed bg-white z-1000 no-scroll justify-center w-full h-[100vh] overflow-y-hidden overflow-clip" : "hidden" }>
            <ul className="flex flex-col mt-20 text-center text-2xl gap-4">
                <li>
                    <Link className={` ${isActive("/", pathname)}`} href="/">Home</Link>
                </li>
                <li>
                    <Link className={` ${isActive("/aktiviteter", pathname)}`} href="/popular-clases">Popular Classes</Link>
                </li>
                <li>
                    <Link className={` ${isActive("/search", pathname)}`} href="/search">Search</Link>
                </li>
                <li>
                    <Link className={` ${isActive("/profile", pathname)}`} href="/profile">My Profile</Link> {/* Fjernet: { profilMenuText } - Skift mellem "Profil" og "Log ind" baseret på loginstatus */}
                </li>
                <li>
                    <LogOutBtn />
                </li>
                
            </ul>
     </nav>   
    )

}