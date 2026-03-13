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
                <h2 className="text-xl font-[600] mb-2">{workout.className}</h2>
                <h3 className="text-md mt-4 font-semibold mb-4">Participants:</h3>
                <ul>
                    {workout.users.map((user) => (
                        <li className="border-solid outline rounded-full border-inherit flex justify-between px-5 py-3 mb-4"
                            key={user.id}>
                            <p className="self-center leading-none"><FaUserLarge size={15} className="inline mr-2"/>{user.userFirstName} {user.userLastName}</p>
                            {/* <p>age: {user.age}</p> */}
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
 }