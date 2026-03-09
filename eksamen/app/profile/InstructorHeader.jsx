import { getAuthenticatedUser } from "../lib/getAuthentificatedUser";
import { FaUserLarge } from "react-icons/fa6";

 export default async function InstructorHeader() {

    const user = await getAuthenticatedUser(); //Hjælpefunktion til at få id'et på den der er logget ind og hente brugerdata.

    return (
        <>
            <h1 className='text-xl font-semibold text-center my-4'>Min profil</h1>
        
                <div className='text-black text-center py-2 px-6 flex items-center gap-2'>
                    <div className='bg-[#F1C40E] w-[50px] h-[50px] flex items-center justify-center rounded-full'><FaUserLarge  size={25}/></div>
                    <div>
                    <p className='text-md text-left'>{user.userFirstName} {user.userLastName}</p>
                    <p className='text-sm text-left'>{user.role}</p>
                    </div>
                </div>
        </>
    );
}