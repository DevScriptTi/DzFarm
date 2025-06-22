import { VeterinaryCard, VeterinaryCardSkeleton } from "@/components/local/veterinaries/VeterinaryCard";
import { getAllVeterinarys } from "@/lib/server/actions/veterinarys/getAllVeterinaryscopy";
import { Suspense } from "react";

export default function page() {
    return (
        <Suspense
            fallback={<VeterinaryCardSkeleton />}
        >
            <Index />
        </Suspense>
    )
}

async function Index() {
    const veterinaies = await getAllVeterinarys();
    return (
        <div
            className="p-4 text-on-surface dark:text-dark-on-surface text-headline-large"
        >
            <div>
                Veterinaries
            </div>
            <div
                className="grid gap-2 grid-cols-[repeat(auto-fill_,_minmax(300px_,_1fr))]"
            >
                {
                    veterinaies.data.data.map(veterinary => (
                        <VeterinaryCard key={veterinary.id} veterinary = {veterinary} />
                    ))
                }
            </div>
        </div>
    )
}