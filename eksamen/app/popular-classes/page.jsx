//hent ind lisetevisning med aktiviteter/hold med fetch og ved klik på aktiviteten gå til detaljesiden/den aktivitets id -> /aktiviteter/[id]
//import Menu from '../components/Menu';

import { getWorkoutClasses } from '../lib/dal';
import Link from 'next/link';
import WorkoutCard from '../components/WorkoutCard';

export default async function PopularWorkoutClassesPage() {
  const workoutClasses = await getWorkoutClasses();

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
            <h1>Popular Classes</h1>
            <section>
                <p>section der henter 1 tilfældig workout-klasse ud og vises. Lav komponent til den, eller måske kan workoutCard også bruges her? workoutcar.random something</p>
            </section>

            <section >
                <h1 className='mx-8 my-4 text-3xl'>Classes for You</h1>
                { workoutClasses.map(workout => (
                <WorkoutCard workout={workout} key={workout.id}/>
                ))}
            </section>
        </main>
    </>
  );
}