import Image from "next/image";

import { getNews } from "../../lib/dal"


export default async function NewsSection() {

    const news = await getNews();
    console.log("news:", news)

    return (
    <section>
        <h2 className="px-6 text-6xl font-bold text-[#F1C40E] mb-2">News</h2>
        {news.map(n => (
            <article className="mx-6 mb-7" key={n.id}>
            <h2 className="text-xl font-semibold font-[500] mb-2">{n.title}</h2>
            <Image width={800} height={600} unoptimized src={n.asset.url} alt={n.title} />
            <p className="text-m leading-[1.2] my-2">{n.text}</p>
            </article>
        ))}
     </section>
    )
};