'use client'

import { useActionState } from "react";
import { CreateUser } from "./creat-action";  
import Link from "next/link";

const initialState = {
    values: {
        username: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: '',
        age: ''
    },
    errors: undefined
};


    export default function CreateUserForm() {
     const [state, formAction, isPending] = useActionState(CreateUser, initialState);

    return (
        <form action={formAction} 
        className="mx-7 flex flex-col gap-6 mb-10 pb-10">
            <div>
                <input className="border-solid outline rounded-full border-inherit w-full text-s text-[#9E9E9E] p-2 text-lg"
                 type="text"
                 name="firstname"
                 defaultValue={state.values.firstname}
                 placeholder="Enter your first name..."/>
                {/* defaultvalue indsættes ud fra state, her er state enten inistialState eller den opdaterede state, med brugerens input values, optional chaining er derfor ikke nødvendig her, fordi vi har defineret en inistialState. */}
                {state.errors?.firstname && <p>{state.errors.firstname}</p>}
            </div>

            <div>
                <input className="border-solid outline rounded-full border-inherit w-full text-s text-[#9E9E9E] p-2 text-lg"
                 type="text"
                 name="lastname"
                 defaultValue={state.values.lastname}
                 placeholder="Enter your last name..."/>
                {/* defaultvalue indsættes ud fra state, her er state enten inistialState eller den opdaterede state, med brugerens input values, optional chaining er derfor ikke nødvendig her, fordi vi har defineret en inistialState. */}
                {state.errors?.lastname && <p>{state.errors.lastname}</p>}
            </div>


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
                <input className="border-solid outline rounded-full border-inherit w-full text-s text-[#9E9E9E] p-2 text-lg"
                type="password"
                name="password"
                defaultValue={state.values.password}
                placeholder="Enter your password..."/>
                {state.errors?.password && <p>{state.errors.password}</p>}
            </div>

               <div>
                <input className="border-solid outline rounded-full border-inherit w-full text-s text-[#9E9E9E] p-2 text-lg"
                type="password"
                name="confirmPassword"
                defaultValue={state.values.confirmPassword}
                placeholder="Repeat your password..."/>
                {state.errors?.confirmPassword && <p>{state.errors.confirmPassword}</p>}
            </div>

            <div className="mx-10 flex justify-center">
                { state.errors?.form && <p>{state.errors.form}</p> }
                
                {state.success && 
                <div className="w-full h-full bg-yellow-600/50 fixed top-0 left-0 z-50 flex items-center justify-center"> 
                <div className="text-black text-center mx-4 font-bold mb-10 bg-gray-200 p-25 rounded-3xl absolute top-[25%] z-1000 flex flex-col items-center shadow-4xl border-4 border-yellow-200">

                        <p className="mb-4">{state.success}</p>

                        <Link href="/login" className="bg-[#F1C40E] text-black font-bold uppercase text-sm py-3 px-6 rounded-full mt-4">
                            Log ind
                        </Link>
                    
                    </div>
                </div>
                }

                <button className="text-[#003147] bg-[#F1C40E] p-3 w-full rounded-full text-sm font-bold uppercase"
                type="submit"
                disabled={isPending}>{ isPending ? "adding user..." : "sign up" }</button>
            </div>
            
    
        </form>
    )
}