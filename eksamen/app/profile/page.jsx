//import { cookies } from 'next/headers';
//import { getUserDetails } from '../lib/dal';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '../lib/getAuthentificatedUser';
import { FaUserLarge } from "react-icons/fa6";
import ProfileHeader from './ProfileHeader';
import LogOutBtn from './LogOutBtn';
import LeaveBtn from './LeaveBtn'


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
                            <article className='my-6 bg-white/80 px-4 py-6 text-black rounded-3xl border border-[#9E9E9E]'
                                key={workoutClass.id}>
                                <h3 className='text-3xl pb-2 font-[500]'>{workoutClass.className}</h3>
                                <p className='pb-4 text-m leading-5'>{workoutClass.classDay} kl. {workoutClass.classTime}</p>
                                <div className='flex justify-between'>
                                    <Link className='bg-[#F1C40E] text-black px-6 py-4 rounded-full text-sm font-bold uppercase'
                                    href={`/popular-classes/${workoutClass.id}`}>Show Class</Link>

                                   <LeaveBtn userId={user.id} classId={workoutClass.id} />

                                </div>
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