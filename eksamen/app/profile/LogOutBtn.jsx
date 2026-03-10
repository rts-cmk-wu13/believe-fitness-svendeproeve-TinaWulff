
import LogoutAction from './logOut-action';

export default function LogOutBtn() {
    return (
        <form className='relative flex justify-center mr-4' action={LogoutAction}>
            <button className='flex-end align-end bg-[#9E9E9E] px-10 py-3 rounded-full text-yellow-400 font-bold uppercase text-sm absolute top-[40px] shadow-lg' type='submit'>Log out</button>
        </form>
    )
}