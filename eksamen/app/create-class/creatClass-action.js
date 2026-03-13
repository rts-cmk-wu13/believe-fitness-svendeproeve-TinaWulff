'use server'; //der er en serveraction, så skal der stå 'use server' øverst i filen. Det er en slags "marker" for Next.js, så den ved at det her er en serveraction.

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const createClassSchema = z.object({
  className: z.string().min(1, "Indtast holdnavn"),
  classDescription: z.string().min(1, "Indtast beskrivelse"),
  classDay: z.string().min(1, "Indtast ugedag"),
  classTime: z.string().min(1, "Indtast tidspunkt"),
  trainerId: z.string().min(1, "Indtast instruktørnummer"),
  maxParticipants: z.string().min(1, "Indtast max deltagere"),
  asset: z
    .any()
    .optional()
    .refine((file) => !file || (file.size === 0) ||
        (file.type && ["image/jpeg", "image/png"].includes(file.type) && file.size <= 4_194_304),
      "Kun jpg eller png tilladt og maks 4MB")
});

export async function CreateClass(prevState, formData) {

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || "";


  const values = {
    className: formData.get('className') || '',
    classDescription: formData.get('classDescription') || '',
    classDay: formData.get('classDay') || '',
    classTime: formData.get('classTime') || '',
    trainerId: formData.get('trainerId') || '',
    maxParticipants: formData.get('maxParticipants') || '',
    asset: formData.get('asset') || null
  };

  const sendData = new FormData();
  sendData.append('className', values.className);
  sendData.append('classDescription', values.classDescription);
  sendData.append('classDay', values.classDay);
  sendData.append('classTime', values.classTime);
  sendData.append('trainerId', values.trainerId);
  sendData.append('maxParticipants', values.maxParticipants);
  if (values.asset) sendData.append('asset', values.asset);

  // Valider med Zod
  const result = createClassSchema.safeParse(values);

   
  if (!result.success) {
    // Zod fejl-format
    return {
      values,
      errors: result.error.flatten().fieldErrors
    };
  }
    // z.flattenError er en zod-funktion, der "flader" fejlene ud, så de er nemmere at arbejde med i vores form. Det gør det nemmere at vise de rigtige fejlmeddelelser ved siden af de rigtige inputfelter i formularen.
    // fieldErrors er en del af det objekt, som z.flattenError returnerer, det er her z.objektets fejlbesker ligger og vi her med .fieldErrors får adgang til dem, så vi kan sende dem tilbage til vores form og vise dem for brugeren.


  // const params = new URLSearchParams();
  // Object.entries(values).forEach(([key, value]) => {
  //   params.append(key, value);
  // });

  const response = await fetch("http://localhost:4000/api/v1/classes", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      // "Content-Type": "application/json"
    },
    body: sendData
  });

  if (!response.ok) {
    // const errorText = await response.text();
    // console.log('Backend status:', response.status);
    // console.log('Backend res:', errorText);
    return {
      values,
      errors: { form: ["Noget gik galt, prøv igen senere"] },
      success: false
    };
  }

  // Hvis alt lykkes, returnér dette:
  return {
    values: {
        className: '',
        classDescription: '',
        classDay: '',
        classTime: '',
        trainerId: '',
        maxParticipants: '',
        asset: null 
    },
    errors: undefined,
    success: "Hold oprettet!"
  };

}
