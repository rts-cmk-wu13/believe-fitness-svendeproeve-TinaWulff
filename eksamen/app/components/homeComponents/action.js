'use server'; //der er en serveraction, så skal der stå 'use server' øverst i filen. Det er en slags "marker" for Next.js, så den ved at det her er en serveraction.

import { z }from "zod";
import { cookies } from "next/headers";

const emailSchema = z.object({
    email: z.string().email("Indtast venligst en gyldig email!")
});

export async function registerEmail(prevState, formData) { // når vi laver en action og kobler den med et actionstate skal to argumenter med: forrige state (prevState) og formData (formdataen fra formularen)

    const cookieStore = await cookies();

    const email = formData.get("email");

    console.log(email);

    if (email === prevState.values.email) {
        return prevState;
    } // hvis det er samme values der indsættes og forsøges at logge ind med flere gange,
    // så returnerer vi bare den forrige state, så vi ikke starter hele login-processen forfra
    // og dermed ikke laver unødvendige kald til serveren.

    const result = emailSchema.safeParse({ email });

    if (!result.success) {
        console.log(z.flattenError(result.error).fieldErrors);  
        return {
            values: { email },
            errors: z.flattenError(result.error).fieldErrors 
        }
    }
    // z.flattenError er en zod-funktion, der "flader" fejlene ud, så de er nemmere at arbejde med i vores form. Det gør det nemmere at vise de rigtige fejlmeddelelser ved siden af de rigtige inputfelter i formularen.
    // fieldErrors er en del af det objekt, som z.flattenError returnerer, det er her z.objektets fejlbesker ligger og vi her med .fieldErrors får adgang til dem, så vi kan sende dem tilbage til vores form og vise dem for brugeren.

    const response = await fetch("http://localhost:4000/api/v1/newsletter", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
     },
        body: JSON.stringify({ email }) //konstruerer json body/objekt
    });

    if (!response.ok) {
    // hvis det ikke er ok, altså hvis der er en fejl, så returnerer vi den her state, som indeholder de værdier brugeren indtastede (så de ikke skal indtaste det hele igen) og en form-fejl.
    return { 
        values: { email },
        errors: { form: ["forkert email."]},
        success: false
    }
    }

     // Hvis alt lykkes, returnér dette:
    return {
        values: { email },
        errors: undefined,
        success: true
    }

}



