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
        className="mx-7 grid grid-cols-2 gap-6 mb-10 pb-10">
            <h1 className="text-4xl my-4 mt-8 col-span-2">Opret hold</h1>

            <div className="col-span-2">
                <input className="bg-[#E9E9E9] w-full text-[#003147] p-3 text-lg placeholder:text-left align-top"
                 type="text"
                 name="className"
                 defaultValue={state.values.className}
                 placeholder="Class name..."/>
                {/* defaultvalue indsættes ud fra state, her er state enten inistialState eller den opdaterede state, med brugerens input values, optional chaining er derfor ikke nødvendig her, fordi vi har defineret en inistialState. */}
                {state.errors?.className && <p>{state.errors.className}</p>}
            </div>

            <div className=" col-span-2">
                <textarea
                    className="bg-[#E9E9E9] w-full text-[#003147] p-3 text-lg placeholder:text-left align-top"
                    type="text"
                    name="classDescription"
                    defaultValue={state.values.classDescription}
                    placeholder="Class description..."
                    rows={4}
                />
                {state.errors?.classDescription && <p>{state.errors.classDescription}</p>}
            </div>


            <div>
                <input className="bg-[#E9E9E9] w-full text-[#003147] p-3 text-lg"
                 type="text"
                 name="classDay"
                 defaultValue={state.values.classDay}
                 placeholder="Class day..."/>
                {/* defaultvalue indsættes ud fra state, her er state enten inistialState eller den opdaterede state, med brugerens input values, optional chaining er derfor ikke nødvendig her, fordi vi har defineret en inistialState. */}
                {state.errors?.classDay && <p>{state.errors.classDay}</p>}
            </div>

            <div>
                <input className="bg-[#E9E9E9] w-full text-[#003147] p-3 text-lg"
                 type="time"
                 name="classTime"
                 defaultValue={state.values.classTime}
                 placeholder="Class time.."/>
                {/* defaultvalue indsættes ud fra state, her er state enten inistialState eller den opdaterede state, med brugerens input values, optional chaining er derfor ikke nødvendig her, fordi vi har defineret en inistialState. */}
                {state.errors?.classTime && <p>{state.errors.classTime}</p>}
            </div>

                <div>
                <input className="bg-[#E9E9E9] w-full text-[#003147] p-3 text-lg"
                type="text"
                name="trainerId"
                defaultValue={state.values.trainerId}
                placeholder="Class trainer..."/>
                {state.errors?.trainerId && <p>{state.errors.trainerId}</p>}
            </div>

               <div>
                <input className="bg-[#E9E9E9] w-full text-[#003147] p-3 text-lg"
                type="text"
                name="maxParticipants"
                defaultValue={state.values.maxParticipants}
                placeholder="Max participants in class..."/>
                {state.errors?.maxParticipants && <p>{state.errors.maxParticipants}</p>}
            </div>

            <div>
                <p className="mb-2">Choose an Image:</p>
                <label htmlFor="file-upload" className="cursor-pointer bg-[#E9E9E9] text-[#003147] py-2 px-4 rounded-lg">
                <input type="file" name="asset" accept=".jpeg .jpg .png"/>
                {/* FYI defaultValue virker ikke på images, fordi filinput ikke kan have en defaultValue af sikkerhedsmæssige årsager */}
                </label>
                <span className="error-besked">
                {state.errors?.image && formState.errors.image.join(", ")}
                </span>
            </div>

            <div className="col-span-2 flex flex-col items-center">
                { state.errors?.form && <p>{state.errors.form}</p> }
                
                {state.success && 
                <div className="w-full h-full bg-[#003147]/70 fixed top-0 left-0 z-50 flex items-center justify-center"> 
                <div className="text-green-600 mb-10 bg-gray-200 p-20 rounded-lg absolute top-[40%] z-1000 flex flex-col items-center shadow-4xl border-4 border-green-600">

                        <p className="mb-4">{state.success}</p>

                        <Link href="/profile" className="bg-[#003147] text-white py-3 px-6 rounded mt-4">
                            go to classes view
                        </Link>
                    
                    </div>
                </div>
                }

                <button className="text-[#003147] bg-[#E9E9E9] p-3 w-full max-w-[300px] rounded-lg text-lg"
                type="submit"
                disabled={isPending}>{ isPending ? "Opretter hold..." : "Opret hold" }</button>
            </div>
    
        </form>
    )
}