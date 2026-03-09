//import { cookies } from 'next/headers';
//import { getUserDetails } from '../lib/dal';

import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '../lib/getAuthentificatedUser';
import { FaUserLarge } from "react-icons/fa6";
import InstructorProfile from './InstructorProfile';
import InstructorHeader from './InstructorHeader';
import Link from 'next/link';
import LogoutAction from './logOut-action';


export default async function ProfilPage() {

    const user = await getAuthenticatedUser(); //Hjælpefunktion til at få id'et på den der er logget ind og hente brugerdata.

//    console.log("user:", user);
    //console.log("token:", token?.value);
  
    if (user.role === "default") {
        // vis medlem-UI
        return (
            <section className='flex flex-col'>
                <h1 className='text-xl my-4 px-6'>My profile</h1>
            
                <div className='text-black text-center py-2 px-6 flex items-center gap-2'>
                    <div className='bg-[#F1C40E] w-[50px] h-[50px] flex items-center justify-center rounded-full'><FaUserLarge  size={25}/></div>
                    <div>
                    <p className='text-md text-left'>{user.userFirstName} {user.userLastName}</p>
                    <p className='text-sm text-left'>Member</p>
                    </div>
                </div>

                <section className='m-4'>
                    {user.classes.map(workoutClass => (
                            <article className='my-2 bg-white/80 px-4 py-6 text-black rounded-2xl border border-[#9E9E9E]'
                                key={workoutClass.id}>
                                <h3 className='text-xl pb-2 font-semibold'>{workoutClass.className}</h3>
                                <p className='pb-4 text-sm leading-5'>{workoutClass.classDay} kl. {workoutClass.classTime}</p>
                                <Link className='bg-[#F1C40E] text-black px-6 py-3 rounded-full text-xs font-bold uppercase'
                                href={`/popular-classes/${workoutClass.id}`}>Show Class</Link>
                            </article>
                        ))}
                </section>

                <form className='relative flex justify-center mr-4' action={LogoutAction}>
                <button className='flex-end align-end bg-[#9E9E9E] px-10 py-3 rounded-full text-yellow-400 font-bold uppercase text-sm absolute top-[40px] shadow-lg' type='submit'>Log out</button>
                </form>
            </section>
        )
    }

    else if (user.role === "admin") {
        // vis instruktør-UI'
        return (
            <>
                <InstructorHeader />

                <InstructorProfile userId={user.id} />
                
                <form className='relative flex justify-center mr-4' action={LogoutAction}>
                <button className='flex-end align-end bg-[#9E9E9E] px-10 py-3 rounded-full text-yellow-400 font-bold uppercase text-sm absolute top-[40px] shadow-lg' type='submit'>Log out</button>
                </form>
            </>
        )
    }
}