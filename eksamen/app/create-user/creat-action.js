'use server'; //der er en serveraction, så skal der stå 'use server' øverst i filen. Det er en slags "marker" for Next.js, så den ved at det her er en serveraction.

import { z }from "zod";

const createUserSchema = z.object({
  firstname: z.string().min(2, "Enter your first name"),
  lastname: z.string().min(2, "Enter your last name"),
  username: z.string().min(4, "Enter a username with at least 4 characters"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  confirmPassword: z.string().min(4, "Password must be at least 4 characters"),
});

export async function CreateUser(prevState, formData) { // når vi laver en action og kobler den med et actionstate skal to argumenter med: forrige state (prevState) og formData (formdataen fra formularen)

const values = {
  username: formData.get('username') || '',
  password: formData.get('password') || '',
  confirmPassword: formData.get('confirmPassword') || '',
  firstname: formData.get('firstname') || '',
  lastname: formData.get('lastname') || '',
  role: 'default'
};


// Password match check
if (values.password !== values.confirmPassword) {
  return {
    values,
    errors: { confirmPassword: ["Passwords must match"] },
    success: false
  };
}

    console.log(values);

    // Valider med Zod
    const result = createUserSchema.safeParse(values);

   
    if (!result.success) {
        console.log(z.flattenError(result.error).fieldErrors);  
        return {
            values,
            errors: z.flattenError(result.error).fieldErrors 
        }
    }
    // z.flattenError er en zod-funktion, der "flader" fejlene ud, så de er nemmere at arbejde med i vores form. Det gør det nemmere at vise de rigtige fejlmeddelelser ved siden af de rigtige inputfelter i formularen.
    // fieldErrors er en del af det objekt, som z.flattenError returnerer, det er her z.objektets fejlbesker ligger og vi her med .fieldErrors får adgang til dem, så vi kan sende dem tilbage til vores form og vise dem for brugeren.

    const response = await fetch("http://localhost:4000/api/v1/users", {
    method: "POST",
    body: JSON.stringify(values),
    headers: { "Content-Type": "application/json" }
    });

    //console.log(await response.json())

    if (!response.ok) {
    // hvis det ikke er ok, altså hvis der er en fejl, så returnerer vi den her state, som indeholder de værdier brugeren indtastede (så de ikke skal indtaste det hele igen) og en form-fejl.
    return { 
        values,
        errors: { form: ["Noget gik galt, prøv igen senere"]},
        success: false
    }
    }

     // Hvis alt lykkes, returnér dette:
    return {
        values: {
        username: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: '',
    },
        errors: undefined,
        success: "Bruger oprettet, du kan nu logge ind!"
    }

}
