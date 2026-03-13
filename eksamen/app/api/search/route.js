//API route (Next.js): /api/search er en "API route".
// Til Fetch til API:
// "Client-side fetch", "API request", "server-side search".
// FORDI: Det er mere effektivt og sikkert at søge på serveren.

import { NextResponse } from 'next/server';
import { getWorkoutClasses } from '../../lib/dal';
//import { getUserDetails } from '../../lib/dal';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

    try {
  // Hent data fra flere kilder, hvis nødvendigt hent flere fetchkald ind
  const workoutClasses = await getWorkoutClasses();
  
    if (!workoutClasses) {
      return Response.json({ succes: false, message: "No data found" }, { status: 404 });
    }

  // Filtrer data
  const ClassesResults = workoutClasses.filter(wc =>
    wc.className &&
    wc.className.toLowerCase().includes(query)
  );

  const weekdayResults = workoutClasses.filter(wc =>
    wc.classDay &&
    wc.classDay.toLowerCase().includes(query)
  );

  const TrainersResults = workoutClasses.filter(wc =>
    wc.trainer &&
    wc.trainer.trainerName &&
    wc.trainer.trainerName.toLowerCase().includes(query)
  );

    const descriptionResults = workoutClasses.filter(wc =>
    wc.classDescription &&
    wc.classDescription.toLowerCase().includes(query)
  );


  return NextResponse.json({
    workouts: ClassesResults,
    weekdays: weekdayResults,
    trainers: TrainersResults,
    description: descriptionResults,
  });

   } catch (error) {
    return NextResponse.json({ succes: false, message: error.message }, { status: 500 });
  }
}