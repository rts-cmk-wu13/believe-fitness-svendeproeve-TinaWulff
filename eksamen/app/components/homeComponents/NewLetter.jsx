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
    
        <section className="mx-6 pt-10 mb-12">
            <h2 className="text-2xl mb-4 font-bold">Sign up for our newsletter</h2>

            <p className="text-m leading-[1.2] mb-6">Sign up to receive the latest news and announcements from Believe Fitness</p>

            {state.success && (
            <p className="mb-4 text-green-400">Tak for din tilmelding til nyhedsbrevet, du vil snart modtage mails fra os.</p>
            )}
            <form className="flex w-full gap-4" action={formAction}>
                <div className="w-full p-3 rounded-full bg-white border-1 border-[#9E9E9E] w-full text-s">
                    <label htmlFor="email"></label>
                    <input className="text-black w-full text-m" type="text" name="email" defaultValue={state.values.email} placeholder="Enter your email..."/>
                    {/* defaultvalue indsættes ud fra state, her er state enten inistialState eller den opdaterede state, med brugerens input values, optional chaining er derfor ikke nødvendig her, fordi vi har defineret en inistialState. */}
                </div>
                <div>
                    <button className="text-black font-[500] bg-[#F1C40E] self-end p-3 rounded-full w-fit-content min-w-[110px] text-m uppercase" type="submit" disabled={isPending}>{ isPending ? "regitrerer mail..." : "sign up" }</button>
                </div>
            </form>
            { state.errors?.form && (<p className="text-red-500">{state.errors.form}</p>) }
            { state.errors?.email && (<p className="text-red-500">{state.errors.email[0]}</p>)}
        </section>
    )
}