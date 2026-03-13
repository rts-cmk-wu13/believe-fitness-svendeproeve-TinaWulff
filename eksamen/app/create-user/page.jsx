
import Image from "next/image";
import CreateUser from "./CreateUser";



export default function OpretBrugerPage() {

    return (
        <>
        <header className="mb-12 pt-10">
            <h1 className="text-6xl w-[60%] font-bold text-[#F1C40E] p-8 pb-3">Believe Fitness</h1>
            <h2 className="text-xl font-bold"><span className="text-3xl font-light">—</span> Train like a pro</h2>
        </header>

        <CreateUser />
        </>
    )

}