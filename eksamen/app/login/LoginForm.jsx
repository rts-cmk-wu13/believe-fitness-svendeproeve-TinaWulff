'use client'

import { useActionState } from "react";
import { loginUser } from "./action";   
import { useRouter } from 'next/navigation';
// import { AuthContext } from "../lib/authcontext";
// import { useContext, useEffect } from "react";

const initialState = {
    values: {
        username: '',
        password: ''
    },
    errors: undefined
};

export default function LoginForm() {
    // const { setLoggedIn } = useContext(AuthContext);
    const [state, formAction, isPending] = useActionState(loginUser, initialState);

    // useEffect(() => {
    //     if (state.values.username && state.values.password) {
    //         setLoggedIn(true);
    //     }
    // }, [state.values, setLoggedIn]);

//     useEffect(() => {
//     if (state.success) {
//         setLoggedIn(true);
//     }
// }, [state.success, setLoggedIn]);

    return (
        <form action={formAction} 
        className="mx-7 flex flex-col gap-6">
            <h1 className="text-lg mt-10 font-semibold">Log in with your credentials</h1>
            <div>
                <input className="border-solid outline rounded-full border-inherit w-full text-s text-[#9E9E9E] p-2 text-lg"
                 type="text"
                 name="username"
                 defaultValue={state.values.username}
                 placeholder="Enter your username..."/>
                {/* defaultvalue indsættes ud fra state, her er state enten inistialState eller den opdaterede state, med brugerens input values, optional chaining er derfor ikke nødvendig her, fordi vi har defineret en inistialState. */}
                {state.errors?.username && <p>{state.errors.username}</p>}
            </div>
            <div>
                <input className="border-solid outline rounded-full border-inherit w-full text-[#9E9E9E] p-2 text-lg"
                type="password"
                name="password"
                defaultValue={state.values.password}
                placeholder="Enter your password..."/>
                {state.errors?.password && <p>{state.errors.password}</p>}
            </div>
            <div className="flex justify-center">
                { state.errors?.form && <p>{state.errors.form}</p> }
                <button className="text-[#003147] bg-[#F1C40E] p-3 w-full rounded-full text-sm font-bold"
                type="submit"
                disabled={isPending}>{ isPending ? "Loggin in..." : "LOG IN" }</button>
            </div>
            <p className="self-center text-s text-center text-[#9E9E9E]">Are You not yet a Believer?<br/><a className="underline" href="/create-user">Sign up here</a> to start training like a pro.</p>
        </form>
    )
}

