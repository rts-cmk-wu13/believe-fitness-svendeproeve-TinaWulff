// dokumentations-link:
// https://khuang159.medium.com/creating-a-hamburger-menu-in-react-f22e5ae442cb

'use client'
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
//import Menu from "./Menu"
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import LogOutBtn from "../LogOut/LogOutBtn";


export default function Header() {
    const router = useRouter();

    function isActive(path, currentPath) {
        return path === currentPath ? "text-black" : "text-[#6F6F6F]";
    }
    const pathname = usePathname();


    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        async function checkLogin() {
            const res = await fetch('/api/auth/check', { cache: 'no-store' });
            const data = await res.json();
            setLoggedIn(data.loggedIn);
        }
        checkLogin();
    }, [pathname]); // kører igen når pathname skifter (fx efter login/logout redirect)
    
    
    const Headline = pathname.slice(1).replace(/-/, ' '); 

    const [showMenu, setShowMenu] = useState(false);

    return (
        <>

            <button className="left-0 top-0 mt-4 absolute hover:cursor-pointer inline" onClick={() => router.back()}>
                <IoArrowBackOutline size={30} className={pathname !== "/" ? "text-[#F1C40E] mx-6" : "hidden" } />
            </button>
            <h1 className={ !pathname.startsWith('/my-profile/') && !pathname.startsWith('/classes/') ? "absolute mt-4 left-20 text-2xl capitalize" : "hidden" }>{Headline}</h1>

            <nav  className="col-span-3 row-1 flex absoulte bg-white z-1000 justify-end w-full content-normal">            
                { showMenu ? 
                <IoClose className="absolute text-[#9E9E9E] m-4" size={30}
                onClick={ () =>  setShowMenu((prev) => !prev)}/>
                :
                <HiOutlineMenuAlt3 size={30}
                onClick={ () =>  setShowMenu((prev) => !prev)}
                className="text-[#F1C40E] mx-4 absolute right-0 top-0 mt-4 mb-4" />
                }

                <ul className={showMenu ? " h-[100vh] flex flex-col bg-white w-full mt-35 text-center items-center text-2xl gap-4" : "hidden" }>
                    <li>
                        <Link className={` ${isActive("/", pathname)}`} href="/" onClick={() => setShowMenu(false)}>Home</Link>
                    </li>
                    <li>
                        <Link className={` ${isActive("/aktiviteter", pathname)}`} href="/classes" onClick={() => setShowMenu(false)}>Classes</Link>
                    </li>
                    <li>
                        <Link className={` ${isActive("/search", pathname)}`} href="/search" onClick={() => setShowMenu(false)}>Search</Link>
                    </li>
                    {loggedIn && (
                    <li>
                        <Link className={` ${isActive("/profile", pathname)}`} href="/my-profile" onClick={() => setShowMenu(false)}>My Profile</Link>
                    </li>
                    )}
                    <li>
                        {loggedIn ? <LogOutBtn /> : <Link href="/login" onClick={() => setShowMenu(false)}>Log in</Link>}
                    </li>
                </ul>
            </nav>
        </>

    )
}



