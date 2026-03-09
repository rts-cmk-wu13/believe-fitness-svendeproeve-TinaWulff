
import { getWorkoutClasses } from '../lib/dal';
import Link from 'next/link';
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
//import { FaPlus } from "react-icons/fa";

export default async function InstructorProfile( { userId } ) {

    const allWorkoutClasses = await getWorkoutClasses();
    const instructorClasses = allWorkoutClasses.filter(
    workout => workout.userId === Number(userId)
    );

    return (
        <section className='m-4'>
            {/* <div className='flex justify-between items-end'>
            <Link href="/opret-hold" className='bg-white text-[#003147] px-2 py-2 rounded-lg text-sm shadow-xl'>
                <FaPlus size={20} />
            </Link>
            </div> */}
            {instructorClasses.map(workoutClass => (
                <article className='my-2 bg-white/80 px-4 py-6 text-black rounded-2xl border border-[#9E9E9E]'
                    key={workoutClass.id}>
                    <h3 className='text-xl pb-2 font-semibold'>{workoutClass.className}</h3>
                    <p className='pb-4 text-sm leading-5'>{workoutClass.classDay} kl. {workoutClass.classTime}</p>
                    <div className='flex justify-between'>
                        <p className='mb-3'>Max. participants: {workoutClass.maxParticipants}</p>
                        <p className='mb-3'>Joined: {workoutClass.users.length}</p>
                    </div>
                    <Link className='bg-[#003147] text-white px-6 py-2 rounded-lg text-sm shadow-xl'
                        href={`/deltagerliste/${workoutClass.id}`}>
                        Participants
                    </Link>
                    <div className='flex gap-4'>
                        <button className='bg-[#003147] text-white px-2 py-2 rounded-lg text-sm self-end'><FiEdit size={20} /></button>
                        <button className='bg-[#003147] text-white px-2 py-2 rounded-lg text-sm self-end'><AiOutlineDelete size={20} /></button>
                    </div>
                </article>
            ))}
        </section>
    )
}

// tilføj funktionalitet til opret nyt hold, redigerings- og slet-knapperne.
// create, patch og delete requests.. og formularer til oprettelse og redigering af hold.
