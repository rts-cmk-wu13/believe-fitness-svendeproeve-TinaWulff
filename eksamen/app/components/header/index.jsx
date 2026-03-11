// dokumentations-link:
// https://khuang159.medium.com/creating-a-hamburger-menu-in-react-f22e5ae442cb

'use client'
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Menu from "./Menu"
import { useState } from "react";


export default function Header() {

    // const [loggedIn, setLoggedIn] = useState(false);

    // useEffect(() => {
    //     setLoggedIn(document.cookie.includes('accessToken='));
    // }, []);

    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
        <HiOutlineMenuAlt3 size={25} onClick={ () =>  setShowMenu((prev) => !prev)}
        className="text-[#F1C40E] flex align-end" />
        <Menu state={showMenu} />
        </>

    )
}



