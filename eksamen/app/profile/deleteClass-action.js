'use server'
import { cookies } from 'next/headers';

export async function DeleteClassFromUser(prevState, formData) {

    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    // const userId = formData.get('userId');
    // const classId = formData.get('classId');

        let userId, classId;

    if (formData instanceof FormData) {
        userId = formData.get('userId');
        classId = formData.get('classId');
    } else {
        userId = formData.userId;
        classId = formData.classId;
    }


    const response = await fetch(`http://localhost:4000/api/v1/users/${userId}/classes/${classId}`, {
        method: "DELETE",
        headers: {
        'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        return { success: false, message: "Afmelding fejlede, prøv senere" };
    }
    return { success: true, message: "Du er nu afmeldt holdet!"  };
    }



