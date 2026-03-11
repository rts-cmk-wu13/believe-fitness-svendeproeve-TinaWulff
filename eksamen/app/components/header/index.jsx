// dokumentations-link:
// https://khuang159.medium.com/creating-a-hamburger-menu-in-react-f22e5ae442cb

'use client'
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
//import Menu from "./Menu"
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Header() {


    function isActive(path, currentPath) {
        return path === currentPath ? "text-black" : "text-[#6F6F6F]";
    }
    const pathname = usePathname();
    // const [loggedIn, setLoggedIn] = useState(false);

    // useEffect(() => {
    //     setLoggedIn(document.cookie.includes('accessToken='));
    // }, []);

    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
        <nav  className="flex absoulte bg-white z-1000 justify-end w-full content-normal">            
             { showMenu ? 
             <IoClose className="absolute text-[#9E9E9E] m-3" size={30} onClick={ () =>  setShowMenu((prev) => !prev)}/>
             :
             <HiOutlineMenuAlt3 size={30} onClick={ () =>  setShowMenu((prev) => !prev)}
              className="text-[#F1C40E] m-3" />
            }
            <ul className={showMenu ? " h-[100vh] flex flex-col bg-white w-full mt-20 text-center text-2xl gap-4" : "hidden" }>
                <li>
                    <Link className={` ${isActive("/", pathname)}`} href="/">Home</Link>
                </li>
                <li>
                    <Link className={` ${isActive("/aktiviteter", pathname)}`} href="/popular-classes">Popular Classes</Link>
                </li>
                <li>
                    <Link className={` ${isActive("/search", pathname)}`} href="/search">Search</Link>
                </li>
                <li>
                    <Link className={` ${isActive("/profile", pathname)}`} href="/profile">My Profile</Link> {/* Fjernet: { profilMenuText } - Skift mellem "Profil" og "Log ind" baseret på loginstatus */}
                </li>
                <li>
                    <Link className={` ${isActive("/profile", pathname)}`} href="/profile">Log Out</Link> 
                </li>
            </ul>
        </nav>  
        </>

    )
}



