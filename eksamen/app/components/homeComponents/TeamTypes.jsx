import Image from "next/image";


export default function TeamTypes({ title, text, img }) {

    return (
        <article className="mx-6 mb-7">
            <h2 className="text-2xl font-[500] mb-2">{title}</h2>
            <Image width={1500} height={1000} src={img} alt={title} />
            <p className="text-m leading-[1.2] my-2">{text}</p>
        </article>
    );
}