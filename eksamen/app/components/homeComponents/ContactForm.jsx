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
    <h2 className="text-2xl font-bold">Contact us</h2>
    <p className="my-2 mb-4">Ask us anything about Believe Fitness!</p>

    {state.success && (
    <p className="mb-4 text-green-400">Tak for din besked, vi vil snart kontakte dig.</p>
    )}
    <form className="flex flex-col w-full gap-4" action={formAction}>
        <div className="w-full p-3 rounded-full bg-white border-1 border-[#9E9E9E] w-full text-s">
            <label htmlFor="name"></label>
            <input className="text-black w-full text-m" type="text" name="name" defaultValue={state.values.name} placeholder="Enter your name..."/>
              {state.errors?.name && <p className="text-red-500">{state.errors.name[0]}</p>}
        </div>

        <div className="w-full p-3 rounded-full bg-white border-1 border-[#9E9E9E] w-full text-s">
            <label htmlFor="email"></label>
            <input className="text-black w-full text-m" type="text" name="email" defaultValue={state.values.email} placeholder="Enter your email..."/>
            {state.errors?.email && <p className="text-red-500">{state.errors.email[0]}</p>}
        </div>
        <div className="w-full px-3 py-6 rounded-3xl bg-white border-1 border-[#9E9E9E] w-full text-s">
            <label htmlFor="message"></label>
            <textarea className="text-black w-full text-m"
            name="message" defaultValue={state.values.message} placeholder="Enter your Message..."></textarea>
            {state.errors?.message && <p className="text-red-500">{state.errors.message[0]}</p>}
        </div>
        <div>
            <button className="text-black font-[500] bg-[#F1C40E] self-end p-3 rounded-full w-full uppercase" type="submit" disabled={isPending}>{ isPending ? "sending message..." : "Send message" }</button>
        </div>
    </form>
    { state.errors?.form && (<p className="text-red-500">{state.errors.form}</p>) }
</section>
)

}