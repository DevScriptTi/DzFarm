import { AnimalCard, AnimalCardSkeleton } from "@/components/local/animals/AnimalCard";
import { getAllAnimals } from "@/lib/server/actions/animals/getAllAnimals";
import { Suspense } from "react";

export default async function page() {

    return (
        <div
            className="p-4 text-on-surface dark:text-dark-on-surface text-headline-large"
        >
            <Suspense
                fallback={<AnimalCardSkeleton />}
            >
                <Index />
            </Suspense>
        </div>
    )
}

async function Index() {
    const animals = await getAllAnimals();
    return (
        <>
            <div>
                Animals
            </div>
            <div
                className="grid gap-2 grid-cols-[repeat(auto-fill_,_minmax(300px_,_1fr))]"
            >
                {
                    animals.data.data.map(animal=>(
                        <AnimalCard key={animal.id} animal={animal}/>
                    ))
                }               
            </div>
        </>
    )
}