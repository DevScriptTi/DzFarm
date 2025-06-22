import { getAnimal } from "@/lib/server/actions/animals/getAnimal";
import UpdateAnimalForm from "./UpdateForm";
import { Suspense } from "react";
import AnimalUpdateSkeleton from "./Animal/AnimalUpdateSkeleton"; 

export default async function UpdateAnimal({ animal }: { animal: number }) {
    return (
        <Suspense fallback={<AnimalUpdateSkeleton />}>
            <UpdateAnimalContent animal={animal} />
        </Suspense>
    );
}

async function UpdateAnimalContent({ animal }: { animal: number }) {
    const animal_ = await getAnimal(Number(animal));

    return <UpdateAnimalForm animal={animal_} />;
}
