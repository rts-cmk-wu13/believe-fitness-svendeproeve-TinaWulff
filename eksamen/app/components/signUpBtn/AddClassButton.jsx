'use client';
import { useActionState } from 'react';
import { AddUserToClass } from "./addClass-action";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AddClassButton({ userId, classId, alreadyJoined }) {
  const initialState = { success: false, message: "" };
  const [state, formAction, isPending] = useActionState(AddUserToClass, initialState);

  const [showButton, setShowButton] = useState(true); // State til at styre visningen af tilmeld-/afmeldknappen
  const [showConfirm, setShowConfirm] = useState(false); // State til at styre visningen af bekræftelsesflowet for afmelding

  /////////// Skjul knappen hvis brugeren ikke er logget ind ///// sammen med showbotton usestate og useeffect, så vi ikke har server/client mismatch. ///////////
  useEffect(() => {
    if (!document.cookie.includes('accessToken=')) {
      setShowButton(false);
    }
  }, []);
  ///////////////////////////////////////

  ///////// Opdatering af data efter tilmelding/afmelding - så knappen opdaterer ////////
  const router = useRouter();
  
  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        router.refresh(); //opdaterer servekomponentens data ikke browserens, så vores tilmeldingsbesked vises indtil clienten refresher siden.
      }, 1500); // 1.5 sekunder
      
      return () => clearTimeout(timer);
    }
  }, [state.success, router]);
  //////////////////////////////////

  ///////// Bekræftelsesflow for afmelding: ////////
  function handleAfmeldClick(e) {
    e.preventDefault();
    setShowConfirm(true);
  }

  function handleCancel() {
    setShowConfirm(false);
  }
  ///////////////////////////////////

  return (
    <div className="z-10 w-full p-6">
      <form action={formAction}>
        <input type="hidden" name="userId" value={userId} />
        <input type="hidden" name="classId" value={classId} />
        <input type="hidden" name="action" value={alreadyJoined ? "Leave" : "Sign up"} />
        {showButton && (
          alreadyJoined ? (
            showConfirm ? (
              <div className="text-center flex flex-col items-center gap-4 bg-gray-300 rounded-xl w-full p-4 shadow-xl relative bottom-5">
                <p className='mr-2 text-black font-bold'>Are you sure, you want to leave the workout class?</p>
                <button
                  className="bg-red-400 text-black font-medium p-3 rounded-lg w-[200px] text-m shadow-lg"
                  type="submit"
                  disabled={isPending}
                >Confirm leaving</button>
                <button type="button" className="bg-gray-100 font-medium text-black p-2 rounded-lg w-[200px] text-m mb-2 shadow-lg" onClick={handleCancel}>Cancel</button>
              </div>
            ) : (
              <button
                className="uppercase bg-[#F1C40E] text-black font-bold p-3 rounded-full flex justify-center w-full max-w-full text-sm"
                type="button"
                onClick={handleAfmeldClick}
                disabled={isPending}
              >Leave</button>
            )
          ) : (
            <button
              className="uppercase bg-[#F1C40E] text-black font-bold p-3 rounded-full flex justify-center w-full max-w-full text-sm"
              type="submit"
              disabled={isPending}
            >sign up</button>
          )
        )}
        {state.message &&  <p className='text-black mt-[5px]' dangerouslySetInnerHTML={{ __html: state.message }} />}
      </form>
    </div>
  );
}