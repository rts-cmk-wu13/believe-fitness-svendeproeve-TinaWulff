import Link from "next/link"
import Image from "next/image";
import { GoStarFill } from "react-icons/go";

// const star = <GoStarFill />


export default function WorkoutCard({ workout, classNameLink, classNameArticle, classNameImage, classNameYDiv }) {
return(
<Link href={`/classes/${workout.id}`} className={`${classNameLink} text-black w-full`} aria-labelledby={"workout-card-" + workout.id}>
        <article className={`my-4 flex flex-col relative w-full ${classNameArticle} `} key={workout.id}>     {/*keypropen bruges til at next kan skelne de forskellige posts fra hinanden, og det er vigtigt at den er unik, derfor bruger vi workout.id*/}
          <Image className={`${classNameImage} w-full max-w-full object-cover aspect-[1/1]`}
          width={300} height={300} src={workout.asset.url} alt={workout.className} unoptimized/>
          <div className={`${classNameYDiv} h-[30%] bg-[#F1C40E] flex flex-col justify-center absolute bottom-0 z-10`}>
             <h2 className="font-bold">
            {workout.className}
            </h2>

             <div className="flex gap-1">
              <GoStarFill  size={16} className="w-[1em]" />
              <GoStarFill  size={16} className="w-[1em]"/>
              <GoStarFill  size={16} className="w-[1em]"/>
              <GoStarFill  size={16} className="w-[1em]"/>
              <GoStarFill  size={16} className="w-[1em]"/>
            </div>
          </div>
        </article>
</Link>
)
}