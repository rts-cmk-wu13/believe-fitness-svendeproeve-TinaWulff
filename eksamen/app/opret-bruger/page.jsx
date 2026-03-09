
import Image from "next/image";
import landrupLogo from "../../assets/landrup-logo.png";
import CreateUser from "./CreateUser";



export default function OpretBrugerPage() {

    return (
        <>
            <Image width={355} height={170} className="relative z-10 mt-15 max-w-[90%] mb-8" src={landrupLogo} alt="Landrup Logo" />
            <CreateUser />
        </>
    )

}