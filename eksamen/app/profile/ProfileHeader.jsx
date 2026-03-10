import { getAuthenticatedUser } from "../lib/getAuthentificatedUser";
import { FaUserLarge } from "react-icons/fa6";

 export default async function ProfleHeader() {

    const user = await getAuthenticatedUser(); //Hjælpefunktion til at få id'et på den der er logget ind og hente brugerdata.

    const userrole = (user.role === "admin") ? "Admin" : "Member";

    return (
        <>
            <header>
                <h1 className='text-xl my-4 px-6'>My profile</h1>
            
                <div className='text-black text-center py-2 px-6 flex items-center gap-2'>
                    <div className='bg-[#F1C40E] w-[50px] h-[50px] flex items-center justify-center rounded-full'><FaUserLarge  size={25}/></div>
                    <div>
                    <p className='text-md text-left'>{user.userFirstName} {user.userLastName}</p>
                    <p className='text-sm text-left'>{userrole}</p>
                    </div>
                </div>
            </header>
        </>
    );
}