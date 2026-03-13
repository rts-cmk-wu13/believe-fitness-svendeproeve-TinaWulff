//Detaljeside for holdet som hentes ud fra dets id
import { cookies } from 'next/headers';
import { getWorkoutDetails } from '../../lib/dal';
import { getTrainer } from '../../lib/dal';
import { getUserDetails } from '../../lib/dal';
import { notFound } from 'next/navigation';
import { GoStarFill } from "react-icons/go";
import AddClassButton from '../../components/signUpBtn/AddClassButton';
import Image from 'next/image';
//import AddActivityButton from '../AddActivityButton';
import Link from 'next/link';
import { IoChevronForward } from "react-icons/io5";


export default async function ActivityDetailPage({ params }) {
    const { id } = await params;
    const workoutId = Number(id);
    const workout = await getWorkoutDetails(workoutId)
    const trainerId = workout.trainerId
    const trainer = await getTrainer(trainerId)

    console.log(workout)

      if (workout.succes === false) {
    return (
        <main> 
            <h1>Oops, something went wrong.</h1> 
            <p>{workout.message}</p>
        </main>
    )
  }

  if (!workout.className) return notFound();

    // Hent bruger-id fra cookie og brugerdata
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    const user = await getUserDetails(userId);

    console.log("user:", user);

    // Tjek om brugeren allerede er tilmeldt workouten
    const alreadyJoined = user?.classes?.some(c => c.id === Number(workoutId));

    return (
        <main>
            <article className='flex flex-col'>
                <div className='flex justify-start items-end relative'>
                    <div className='bg-black/30 w-full h-auto inset-0 absolute z-10'></div>
                    <Image className='w-full object-cover aspect-square max-h-[700px]'
                    width={697} height={646} src={workout.asset?.url || '/assets/welcome.jpg'} alt={workout.className} unoptimized/>

                    <div className='mt-6 mx-6 z-10 absolute text-[#F1C40E]'>
                        <h1 className='text-3xl font-semibold max-w-[70%]'>{workout.className}</h1>
                        <div className="pt-1 pb-2 flex gap-1">
                            <GoStarFill  size={16} />
                            <GoStarFill  size={16} />
                            <GoStarFill  size={16} />
                            <GoStarFill  size={16} />
                            <GoStarFill  size={16} />
                        </div>
                    </div>
                </div>

                <section>
                    <p className='px-6 py-4 font-[500]'>{workout.classDay} <span>- {workout.classTime}</span> </p>
                    <p className='px-6'>{workout.classDescription}</p>

                    <article className='my-4 px-6'>
                        <h2 className='text-2xl font-[600] mb-2'>Trainer</h2>
                        <div className='flex gap-4 items-center'>
                            <Image width={697} height={646} src={trainer.asset.url} alt={workout.className} unoptimized
                            className='rounded-xl w-30 h-30 object-cover'/>
                            <p className='font-bold'>{workout.trainer.trainerName}</p>
                        </div>
                    </article>

                    <AddClassButton
                        userId={userId}
                        classId={workoutId}
                        alreadyJoined={alreadyJoined}
                    /> 
                </section>
            </article>
            
        </main>
    )
    
}