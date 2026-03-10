//import { cookies } from 'next/headers';
//import { getUserDetails } from '../lib/dal';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '../lib/getAuthentificatedUser';
import { FaUserLarge } from "react-icons/fa6";
import ProfileHeader from './ProfileHeader';
import LogOutBtn from './LogOutBtn';

import AdminProfile from './AdminProfile';



export default async function ProfilPage() {

    const user = await getAuthenticatedUser(); //Hjælpefunktion til at få id'et på den der er logget ind og hente brugerdata.

    const userrole = (user.role === "admin") ? "Admin" : "Member";

//    console.log("user:", user);
    //console.log("token:", token?.value);
  
    if (user.role === "default") {
        // vis medlem-UI
        return (
            <section className='flex flex-col'>
           
                <ProfileHeader />

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

                <LogOutBtn />

            </section>
        )
    }

    else if (user.role === "admin") {
        // vis instruktør-UI'
        return (
                <section>
                    <ProfileHeader />

                    <AdminProfile userId={user.id} />
                    
                    <LogOutBtn />
                </section>
        )
    }
}