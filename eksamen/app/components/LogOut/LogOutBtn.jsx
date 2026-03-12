
'use client';
import LogoutAction from './logOut-action';

export default function LogOutBtn() {
    return (
        <form className='relative flex justify-center items-center justify-center' action={LogoutAction}>
            <button className='hover:cursor-pointer top-[25px] flex-end align-end bg-[#9E9E9E] w-[180px] py-4 rounded-full text-yellow-400 font-bold uppercase text-sm absolute shadow-lg' type='submit'>Log out</button>
        </form>
    )
}