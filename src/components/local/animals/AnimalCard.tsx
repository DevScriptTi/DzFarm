import { Animal } from "@/lib/server/type/animal/animal";
import Image from "next/image"

export function AnimalCard({ animal }: { animal: Animal }) {

    return (
        <div
            className="flex gap-2 items-start justify-center p-3.5 bg-surface-container dark:bg-dark-surface-container rounded-4xl text-on-surface dark:text-dark-on-surface text-title-large"
        >
            <div
                className="flex grow flex-col gap-4"
            >
                <AnimalCardItem title="Date of birth" value={animal.date_of_birth} />
                <AnimalCardItem title="Gender" value={animal.gender} />
                <AnimalCardItem title="Type" value={animal.animal_type.name} />
                <AnimalCardItem title="Farm" value={animal.farm.name} />
                <AnimalCardItem title="Farmer" value={`${animal.farm.farmer.name} - ${animal.farm.farmer.last}`} />
                <AnimalCardItem title="Phone" value={animal.farm.farmer.phone} />
                <AnimalCardItem title="Location" value={`Wilaya : ${animal.farm.mechta.baladiya.wilaya.name} | Baladiya : ${animal.farm.mechta.baladiya.name} | ${animal.farm.mechta.name} `} />
            </div>
            <div
                className="flex grow flex-col gap-3"
            >
                <Image src={'/Sheep.jpg'} alt={'Sheep'} className="w-40 rounded-2xl" width={500} height={500} />
                <AnimalCardItem title="Sheep" value="Description" />
                <h1
                    className="text-title-large font-bold"
                >
                    {animal.price || '50000'}
                </h1>
            </div>
        </div>
    )
}


export function AnimalCardItem({ title, value }: { title: string, value: string }) {
    return (
        <div
            className="flex flex-col gap-2"
        >
            <h1
                className="text-body-large"
            >
                {title} :
            </h1>
            <span
                className="text-label-medium text-on-surface-variant dark:text-dark-on-surface-variant"
            >
                {value}
            </span>
        </div>
    )
}

export function AnimalCardSkeleton() {
    return (
        <div className="flex gap-2 items-start justify-center p-3.5 bg-surface-container dark:bg-dark-surface-container rounded-4xl text-on-surface dark:text-dark-on-surface text-title-large animate-pulse">
            <div className="flex grow flex-col gap-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <div className="h-4 w-24 bg-on-surface-variant/30 dark:bg-dark-on-surface-variant/30 rounded" />
                        <div className="h-3 w-16 bg-on-surface-variant/20 dark:bg-dark-on-surface-variant/20 rounded" />
                    </div>
                ))}
            </div>
            <div className="flex grow flex-col gap-3 items-center">
                <div className="w-40 h-40 bg-on-surface-variant/30 dark:bg-dark-on-surface-variant/30 rounded-2xl" />
                <div className="flex flex-col gap-2 w-full">
                    <div className="h-4 w-20 bg-on-surface-variant/30 dark:bg-dark-on-surface-variant/30 rounded" />
                    <div className="h-3 w-24 bg-on-surface-variant/20 dark:bg-dark-on-surface-variant/20 rounded" />
                </div>
                <div className="h-6 w-28 bg-on-surface-variant/40 dark:bg-dark-on-surface-variant/40 rounded" />
            </div>
        </div>
    );
}