import Link from "next/link"
import Image from "next/image";
import { GoStarFill } from "react-icons/go";

// const star = <GoStarFill />


export default function WorkoutCard({ workout }) {
return(
<Link href={`/popular-classes/${workout.id}`} className="text-black" aria-labelledby={"workout-card-" + workout.id}>
        <article className='my-8 mx-6 flex flex-col relative' key={workout.id}>     {/*keypropen bruges til at next kan skelne de forskellige posts fra hinanden, og det er vigtigt at den er unik, derfor bruger vi workout.id*/}
          <Image className="rounded-tr-4xl rounded-tl-4xl rounded-bl-4xl w-full max-w-full object-cover aspect-[1/1]"
          width={300} height={300} src={workout.asset.url} alt={workout.className} unoptimized/>
          <div className="py-6 h-[96px] bg-[#F1C40E] flex flex-col absolute bottom-0 z-10 self-end rounded-tr-4xl rounded-bl-4xl w-full">
             <h2 className="px-6 text-xl font-bold" id={"workout-card-" + workout.id}>
            {workout.className}
            </h2>

             <div className="pt-1 pb-2 px-6 flex gap-1">
              <GoStarFill  size={16} />
              <GoStarFill  size={16} />
              <GoStarFill  size={16} />
              <GoStarFill  size={16} />
              <GoStarFill  size={16} />
            </div>
          </div>
        </article>
</Link>
)
}