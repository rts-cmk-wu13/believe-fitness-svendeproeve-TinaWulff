// getAuthenticatedUser bruges også heri, min hjælpefunktion i lib-mappen til at hente profil-data på den der er logget ind.
import { getWorkoutDetails } from "../../lib/dal";
import { FaUserLarge } from "react-icons/fa6";
import ProfileHeader from '../ProfileHeader';

export default async function ParticipantsList( {params} ) {
    const { id } = await params;
    const workoutId = Number(id);
    const workout = await getWorkoutDetails(workoutId)
    
    console.log(workout)

    return (
        <>
            <ProfileHeader />

            <section className="p-6">
                <h1 className="text-xl font-semibold mb-2">{workout.name}</h1>
                <h2 className="text-lg font-semibold mb-4">Deltagere:</h2>
                <ul>
                    {workout.users.map((user) => (
                        <li className="flex justify-between bg-white/80 p-2 rounded-lg text-[#003147] mb-4"
                            key={user.id}>
                            <p className="self-center leading-none"><FaUserLarge size={15} className="inline mr-2"/>{user.userFirstName} {user.userLastName}</p>
                            <p>age: {user.age}</p>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
 }