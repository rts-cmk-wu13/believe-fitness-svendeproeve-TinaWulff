'use client'

import { useActionState } from "react";
import { CreateClass } from "./creatClass-action";
import Link from "next/link";

const initialState = {
    values: {
        className: '',
        classDescription: '',
        classDay: '',
        classTime: '',
        trainerId: '',
        maxParticipants: '',
        asset: null
    },
    errors: undefined
};


export default function CreateClassForm() {
    const [state, formAction, isPending] = useActionState(CreateClass, initialState);

    return (
        <form action={formAction} 
        className="mx-7 grid grid-cols-2 gap-6 mb-10 pb-10 pt-10 max-w-full">
            <h1 className="text-xl font-bold mt-14 col-span-2">Create a new class</h1>

            <div className="col-span-2">
                <input className="border-solid outline rounded-full border-inherit w-full text-s text-[#9E9E9E] p-2 text-lg"
                 type="text"
                 name="className"
                 defaultValue={state.values.className}
                 placeholder="Class name..."/>
                {/* defaultvalue indsættes ud fra state, her er state enten inistialState eller den opdaterede state, med brugerens input values, optional chaining er derfor ikke nødvendig her, fordi vi har defineret en inistialState. */}
                {state.errors?.className && <p>{state.errors.className}</p>}
            </div>

            <div className=" col-span-2">
                <textarea
                    className="border-solid outline rounded-3xl border-inherit w-full text-s text-[#9E9E9E] p-2 text-lg"
                    type="text"
                    name="classDescription"
                    defaultValue={state.values.classDescription}
                    placeholder="Class description..."
                    rows={4}
                />
                {state.errors?.classDescription && <p>{state.errors.classDescription}</p>}
            </div>


            <div>
                <input className="bborder-solid outline rounded-full border-inherit w-full text-s text-[#9E9E9E] p-2 text-lg"
                 type="text"
                 name="classDay"
                 defaultValue={state.values.classDay}
                 placeholder="Class day..."/>
                {/* defaultvalue indsættes ud fra state, her er state enten inistialState eller den opdaterede state, med brugerens input values, optional chaining er derfor ikke nødvendig her, fordi vi har defineret en inistialState. */}
                {state.errors?.classDay && <p>{state.errors.classDay}</p>}
            </div>

            <div>
                <input className="border-solid outline rounded-full border-inherit w-full text-s text-[#9E9E9E] p-2 text-lg"
                 type="time"
                 name="classTime"
                 defaultValue={state.values.classTime}
                 placeholder="Class time.."/>
                {/* defaultvalue indsættes ud fra state, her er state enten inistialState eller den opdaterede state, med brugerens input values, optional chaining er derfor ikke nødvendig her, fordi vi har defineret en inistialState. */}
                {state.errors?.classTime && <p>{state.errors.classTime}</p>}
            </div>

                <div>
                <input className="border-solid outline rounded-full border-inherit w-full text-s text-[#9E9E9E] p-2 text-lg"
                type="text"
                name="trainerId"
                defaultValue={state.values.trainerId}
                placeholder="Class trainer..."/>
                {state.errors?.trainerId && <p>{state.errors.trainerId}</p>}
            </div>

            <div>
                <input className="border-solid outline rounded-full border-inherit w-full text-s text-[#9E9E9E] p-2 text-lg"
                type="text"
                name="maxParticipants"
                defaultValue={state.values.maxParticipants}
                placeholder="Max participants in class..."/>
                {state.errors?.maxParticipants && <p>{state.errors.maxParticipants}</p>}
            </div>

            <div className="col-span-2 mr-4">
                <p className="mb-2">Choose an Image:</p>
                <label htmlFor="file-upload" className="cursor-pointer border-solid outline rounded-full border-inherit w-full text-s text-[#9E9E9E] p-2 text-lg">
                <input type="file" name="asset" accept=".jpeg,.jpg,.png" className="w-full"/>
                {/* FYI defaultValue virker ikke på images, fordi filinput ikke kan have en defaultValue af sikkerhedsmæssige årsager */}
                </label>
                <span className="error-besked">
                {state.errors?.image && formState.errors.image.join(", ")}
                </span>
            </div>

            <div className="col-span-2 flex flex-col items-center">
                { state.errors?.form && <p>{state.errors.form}</p> }
                
                {state.success && 
                <div className="w-full h-full bg-black/70 fixed top-0 left-0 z-50 flex items-center justify-center"> 
                <div className="text-black font-semibold mb-10 bg-gray-200 p-20 rounded-4xl absolute top-[40%] z-1000 flex flex-col items-center shadow-4xl">

                        <p className="mb-4">{state.success}</p>

                        <Link href="/my-profile" className="bg-[#F1C40E] text-black uppercase py-3 px-6 rounded-full mt-4">
                            go back to profile
                        </Link>
                    
                    </div>
                </div>
                }

                <button className="text-[#003147] bg-[#F1C40E] p-3 w-full rounded-full text-sm font-bold uppercase"
                type="submit"
                disabled={isPending}>{ isPending ? "creating class..." : "Create Class" }</button>
            </div>
    
        </form>
    )
}