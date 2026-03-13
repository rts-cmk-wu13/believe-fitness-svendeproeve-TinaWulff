
import { getWorkoutClasses } from '../lib/dal';
import { getTrainers } from '../lib/dal';
import WorkoutCard from '../components/WorkoutCard';
import Image from 'next/image';
import Search from '../components/search/Search';

export default async function SearchPage() {
  const workoutClasses = await getWorkoutClasses();
  const trainers = await getTrainers();


  if (workoutClasses.succes === false) {
    return (
        <main> 
            <h1>Oops, something went wrong.</h1> 
            <p>{workoutClasses.message}</p>
        </main>
    )
  }

    return (
        <>
            <Search />

            <section className='pl-6 mt-2'>
                <h2 className='mt-2 text-xl font-bold'>Classes for You</h2>
                <section  className='flex overflow-x-auto gap-2'>
                    { workoutClasses.map(workout => (
                    <WorkoutCard key={workout.id} workout={workout} 
                    classNameLink='min-w-[150px]' classNameImage='rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl' classNameYDiv='text-[10px] h-[30%] px-2 rounded-tr-3xl rounded-bl-2xl gap-0 w-full'/>
                    ))}
                </section>
            </section>

            <section className='mt-8 px-6 text-[1em] font-bold fixed'>
                <h2 className='text-xl'>Popular Trainers</h2>
                <section  className='flex flex-col gap-2 overflow-y-auto h-[500px]'>
                    { trainers.map(trainer => (
                    <div key={trainer.id} className='flex gap-4 mt-6 items-center'>
                        <Image width={697} height={646} unoptimized 
                        src={trainer.asset.url} alt={trainer.trainerName}
                        className='rounded-xl w-30 h-30 object-cover'/>
                        <p className='font-bold'>{trainer.trainerName}</p>
                    </div>
                    ))}
                </section>
            </section>
        </>
    );
}