'use server'
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function DeleteWorkoutClass(formData) {

    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    const classId = formData.get('classId');

    const response = await fetch(`http://localhost:4000/api/v1/classes/${classId}`, {
        method: "DELETE",
        headers: {
        'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        return { success: false, message: "Sletning fejlede, prøv igen" };
    }

    revalidatePath('/my-profile'); // opdater siden så den slettede klasse forsvinder
    return { success: true };
}

