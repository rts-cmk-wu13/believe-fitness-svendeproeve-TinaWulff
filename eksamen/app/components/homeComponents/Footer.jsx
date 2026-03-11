import { FaCircle } from "react-icons/fa";


export default async function Footer() {


    return (
            <footer className="flex flex-col items-center my-8">
                <h2 className="text-[#F1C40E] font-bold text-4xl mb-2">Believe Fitness</h2>
                <h3 className="font-bold text-xl mb-4">Train like a pro</h3>
                <address className="flex items-center gap-2 not-italic">
                    <p>Rabalderstræde 48</p><FaCircle size={3}/><p>4000 Roskilde</p>
                </address>
                <a href="mailto: hello@believe-fitness.com">hello@believe-fitness.com</a>
            </footer>
    )
};