import { getAnimal } from "@/lib/server/actions/animals/getAnimal";
import { Suspense } from "react";
import AnimalViewSkeleton from "./Animal/AnimalUpdateSkeleton";
import AnimalViewHead from "./viewComponents/ViewComponents";
import { AnimalCardItem } from "../animals/AnimalCard";

export default async function ViewAnimal({ animal }: { animal: number }) {
    return (
        <Suspense fallback={<AnimalViewSkeleton />}>
            <ViewAnimalContent animal={animal} />
        </Suspense>
    );
}

async function ViewAnimalContent({ animal }: { animal: number }) {
    const animal_ = await getAnimal(Number(animal));
    console.log("animal number  : " + Number(animal))
    console.log("animal  : " + process.env.NEXT_PUBLIC_Image_BACKEND_URL+'/'+animal_.qr_code?.path)
    return (
        <>
            <AnimalViewHead qrCode={animal_.qr_code?.path ? `${process.env.NEXT_PUBLIC_Image_BACKEND_URL}/${animal_.qr_code?.path}`: null} slug={animal_.slug} />
            <div
                className="flex flex-col gap-2"
            >
                <div className="my-3 flex gap-2 items-center">
                    <span>Main Infos</span>
                    <hr className=" h-0.5 grow bg-on-surface dark:bg-dark-on-surface" />
                </div>
                <div
                    className="grid grid-cols-2 gap-2 items-start"
                >
                    <AnimalCardItem title="Gander" value={animal_.gender} />
                    <AnimalCardItem title="Whieght" value={animal_.weight.toString()} />
                    <AnimalCardItem title="Price" value={animal_.price.toFixed(2).toString()} />
                    <AnimalCardItem title="Type" value={animal_.animal_type.name} />
                </div>
                <div className="my-3 flex gap-2 items-center">
                    <span>Vaccines</span>
                    <hr className=" h-0.5 grow bg-on-surface dark:bg-dark-on-surface" />
                </div>
                <div className="my-3 flex gap-2 items-center">
                    <span>Illness</span>
                    <hr className=" h-0.5 grow bg-on-surface dark:bg-dark-on-surface" />
                </div>
            </div>
        </>
    )
}
