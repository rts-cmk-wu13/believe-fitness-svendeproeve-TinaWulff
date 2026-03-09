'use client';
import { useActionState } from "react";
import { registerEmail } from "./action";   

const initialState = {
    values: {
        email: ''
    },
    errors: undefined
};

export default function NewLetter() {
 const [state, formAction, isPending] = useActionState(registerEmail, initialState);

    return (
    
        <section className="mx-6  mt-4 mb-12">
            <h2 className="text-4xl mb-4">Nyhedsbrev</h2>

            <p className="text-m leading-[1.2] mb-6">Få direkte besked når vi har sæsonstart eller afholder arrangementer.</p>

            {state.success && (
            <p className="mb-4 text-green-400">Tak for din tilmelding til nyhedsbrevet, du vil snart modtage mails fra os.</p>
            )}
            <form className="flex w-full gap-4" action={formAction}>
                <div className="bg-[#E9E9E9] w-full p-3">
                    <label htmlFor="email"></label>
                    <input className="text-black w-full text-m" type="text" name="email" defaultValue={state.values.email} placeholder="Email"/>
                    {/* defaultvalue indsættes ud fra state, her er state enten inistialState eller den opdaterede state, med brugerens input values, optional chaining er derfor ikke nødvendig her, fordi vi har defineret en inistialState. */}
                </div>
                <div>
                    <button className="text-[#003147] bg-[#E9E9E9] self-end p-3 rounded w-fit-content text-m" type="submit" disabled={isPending}>{ isPending ? "regitrerer mail..." : "Tilmeld" }</button>
                </div>
            </form>
            { state.errors?.form && (<p className="text-red-500">{state.errors.form}</p>) }
            { state.errors?.email && (<p className="text-red-500">{state.errors.email[0]}</p>)}

        </section>
    )
}