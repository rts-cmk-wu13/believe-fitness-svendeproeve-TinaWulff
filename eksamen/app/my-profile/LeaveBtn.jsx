      
    'use client';
    import { useActionState } from 'react';
    import { useRouter } from 'next/navigation';
    import { useEffect, useState } from 'react';
    import { DeleteClassFromUser } from "./userLeaveClass-action"

    export default function LeaveBtn( {userId, classId} ) {
    const initialState = { success: false, message: "" };
    const [state, formAction, isPending] = useActionState(DeleteClassFromUser, initialState);

    const [showConfirm, setShowConfirm] = useState(false); // State til at styre visningen af bekræftelsesflowet for afmelding
      
    ///////// Opdatering af data efter tilmelding/afmelding - så knappen opdaterer ////////
      const router = useRouter();
      
      useEffect(() => {
        if (state.success) {
            setShowConfirm(false);
            const timer = setTimeout(() => {
            router.refresh(); //opdaterer servekomponentens data ikke browserens, så vores tilmeldingsbesked vises indtil clienten refresher siden.
          }, 1500); // 1.5 sekunder
          
          return () => clearTimeout(timer);
        }
      }, [state.success, router]);
      //////////////////////////////////



    ///////// Bekræftelsesflow for afmelding: ////////
    function handleLeaveClick(e) {
        e.preventDefault();
        setShowConfirm(true);
    }

    function handleCancel() {
        setShowConfirm(false);
    }
    ///////////////////////////////////


        return (
            <>
                <form action={formAction}>
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="classId" value={classId} />
                { showConfirm ? (
                <div className="text-center flex flex-col items-center gap-4 bg-gray-300 rounded-xl w-full p-4 shadow-xl relative bottom-5">
                    <p className='mr-2 text-black font-bold'>Are you sure, you want to leave the workout class?</p>
                    <button
                    className="bg-red-400 text-black font-medium p-3 rounded-lg w-[200px] text-m shadow-lg"
                    type="submit"
                    disabled={isPending}
                    >Confirm leaving</button>
                    <button type="button"
                    className="bg-gray-100 font-medium text-black p-2 rounded-lg w-[200px] text-m mb-2 shadow-lg"
                    onClick={handleCancel}>Cancel</button>
                </div>
                ) : (
                <button
                    className="uppercase bg-[#F1C40E] text-black font-bold p-4 px-8 rounded-full flex justify-center w-full max-w-full text-sm"
                    type="button"
                    onClick={handleLeaveClick}
                    disabled={isPending}
                >Leave</button>
                )}
                        </form>
                        {state.message && (
                            <p className={`mt-2 text-black ${state.success ? 'text-green-600' : 'text-red-600'}`}>{state.message}</p>
                        )}

            </>
            
        )
    }