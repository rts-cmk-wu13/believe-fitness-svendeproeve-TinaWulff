import Image from "next/image";
import LoginForm from "./LoginForm";




export default function Home() {

    return (
<>
<h1 className="text-6xl w-[60%] font-bold text-[#F1C40E] p-8 pb-3">Believe Fitness</h1>
<h2 className="text-xl font-bold"><span className="text-3xl font-light">—</span> Train like a pro</h2>

<LoginForm />
</>
)

}