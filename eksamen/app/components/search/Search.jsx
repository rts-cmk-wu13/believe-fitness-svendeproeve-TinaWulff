'use client';
import { FiSearch } from "react-icons/fi";

import { useRef, useState, useEffect } from "react";

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    setShowResults(true)
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data);
  }

  // Fjern søgeresultater når der klikkes udenfor søgefeltet
  const ref = useRef(); //ref er refferencen til det element vi gerne vil holde øje med, her hele search-komponenten (div), så vi kan tjekke om der klikkes udenfor den. (ligesom document.querySelector('.search').addEventListener('click', handleClickOutside) i almindelig JavaScript.
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowResults(false);
        }
    }
     document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // Tilføj også så hvis der ikke er nogle søgeresultater, vises i stedet teksten
  // ”Der blev ikke fundet nogle aktiviteter. Prøv at søge efter noget andet.”

  return (
    <div ref={ref} className="w-full flex flex-col p-6 mt-10 text-black">
      <form className='flex w-full justify-start'
        onSubmit={handleSearch}>
        <input className="border-solid bg-white outline rounded-full border-inherit w-full text-s text-gray-400 p-2 pl-10 text-lg"
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search classes"
        />
        <button className='bg-none p-2 pl-4 self-center absolute left-[20px] mb-[3px]' type="submit">
            <FiSearch className='text-gray-400 border-none text-lg' />
        </button>
      </form>

      {showResults && results && (
        <ul>
          {/* brug spread-operator til at samle resultaterne fra flere arrays og putte i et array */}
          {[...(results.workouts || []), ...(results.weekdays || []), ...(results.trainers || [])].map((item) => (
            <li key={item.id || item.className || item.trainerName || item.classDay}>
                {item.className || item.trainerName || item.classDay}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* Jeg har en React-komponent, der viser et søgefelt. Når brugeren skriver og søger, bliver der lavet et API-kald til /api/search, og resultater vises under feltet.

Hvorfor fetch til API-route?
Jeg laver et fetch-kald til /api/search for at:

Sende søgeordet til serveren (backend).
Få relevante resultater tilbage (aktiviteter og brugere).
Dette kaldes typisk en "API request" eller "server-side search". Det er en god praksis, fordi du kan søge i data på serveren, og kun sende relevante resultater tilbage til klienten.
 */