import Image from "next/image";
import LoginForm from "./LoginForm";
import landrupLogo from "../../assets/landrup-logo.png";



export default function Home() {

    return (
<>
<Image width={355} height={170} className="relative z-10 mt-20 max-w-[90%] mb-4" src={landrupLogo} alt="Landrup Logo" />
<LoginForm />
</>
)

}