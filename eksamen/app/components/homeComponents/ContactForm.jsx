'use client';
import { useActionState } from "react";
import { ContactMessage } from "./action-contact";   

const initialState = {
    values: {
        name: '',
        email: '',
        message: ''
    },
    errors: undefined
};

export default function ContactForm() {
 const [state, formAction, isPending] = useActionState(ContactMessage, initialState);

return (
   
 <section className="mx-6  mt-4 mb-12">
    <h2 className="text-4xl mb-4">Kontakt os</h2>

    {state.success && (
    <p className="mb-4 text-green-400">Tak for din besked, vi vil snart kontakte dig.</p>
    )}
    <form className="flex flex-col w-full gap-4" action={formAction}>
        <div className="bg-[#E9E9E9] w-full p-3">
            <label htmlFor="name"></label>
            <input className="text-black w-full text-m" type="text" name="name" defaultValue={state.values.name} placeholder="Navn"/>
              {state.errors?.name && <p className="text-red-500">{state.errors.name[0]}</p>}
        </div>

        <div className="bg-[#E9E9E9] w-full p-3">
            <label htmlFor="email"></label>
            <input className="text-black w-full text-m" type="text" name="email" defaultValue={state.values.email} placeholder="Email"/>
            {state.errors?.email && <p className="text-red-500">{state.errors.email[0]}</p>}
        </div>
        <div className="bg-[#E9E9E9] w-full p-3">
            <label htmlFor="message"></label>
            <textarea className="text-black w-full text-m"
            name="message" defaultValue={state.values.message} placeholder="Besked"></textarea>
            {state.errors?.message && <p className="text-red-500">{state.errors.message[0]}</p>}
        </div>
        <div>
            <button className="text-[#003147] bg-[#E9E9E9] self-end p-3 rounded w-fit-content text-m" type="submit" disabled={isPending}>{ isPending ? "sender besked..." : "Send" }</button>
        </div>
    </form>
    { state.errors?.form && (<p className="text-red-500">{state.errors.form}</p>) }
</section>
)

}