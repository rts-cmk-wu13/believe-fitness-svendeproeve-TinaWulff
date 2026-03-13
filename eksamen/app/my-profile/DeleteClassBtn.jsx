'use client'
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { DeleteWorkoutClass } from "./adminDeleteClass-action";

export default function DeleteClassBtn({ classId }) {
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <>
            <button
                type="button"
                className='bg-[#F1C40E] text-black px-3 py-3 rounded-full text-xs font-bold uppercase'
                onClick={() => setShowConfirm(true)}>
                <AiOutlineDelete size={20} />
            </button>

            {showConfirm && (
                <div className="w-full h-full bg-black/70 fixed top-0 left-0 z-50 flex items-center justify-center">
                    <div className="bg-white p-10 rounded-2xl flex flex-col items-center gap-4">
                        <p className="font-semibold text-lg">Are you sure you want to delete the class?</p>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                className="bg-gray-200 text-black px-6 py-3 rounded-full text-sm font-bold uppercase"
                                onClick={() => setShowConfirm(false)}>
                                Cancell
                            </button>
                            <form action={DeleteWorkoutClass}>
                                <input type="hidden" name="classId" value={classId} />
                                <button
                                    type="submit"
                                    className="bg-red-400 text-white px-6 py-3 rounded-full text-sm font-bold uppercase">
                                    Yes, delete!
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
