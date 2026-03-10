
import { getWorkoutClasses } from '../lib/dal';
import Link from 'next/link';
import WorkoutCard from '../components/WorkoutCard';

export default async function PopularWorkoutClassesPage() {
  const workoutClasses = await getWorkoutClasses();
  // https://stackoverflow.com/questions/3419928/how-can-i-return-a-random-value-from-an-array
  const randomIndex = Math.floor(Math.random() * workoutClasses.length);
  const randomWorkoutClass = workoutClasses[randomIndex];


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
      <header>
        <p>her skal være en burgermenu</p>
      </header>
        <main className='pb-14'>
            <h1 className='text-[1.5em] px-6 mt-6'>Popular Classes</h1>
            <section className='px-6'>
                <WorkoutCard  classNameImage='rounded-tr-4xl rounded-tl-4xl rounded-bl-4xl' classNameYDiv='px-6 rounded-tr-4xl rounded-bl-4xl gap-2 pr-10 w-[fit-content]' workout={randomWorkoutClass} key={randomWorkoutClass.id} />
            </section>

            <section className='pl-6'>
                <h1 className='mt-8 text-[1em] font-bold'>Classes for You</h1>
                <section  className='flex overflow-x-auto gap-2'>
                    { workoutClasses.map(workout => (
                    <WorkoutCard classNameLink='min-w-[150px]' classNameImage='rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl' classNameYDiv='text-[10px] h-[30%] px-2 rounded-tr-3xl rounded-bl-2xl gap-0 w-full' workout={workout} key={workout.id} />
                    ))}
                </section>
            </section>
        </main>
    </>
  );
}