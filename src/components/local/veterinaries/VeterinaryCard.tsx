import { Veterinary } from "@/lib/server/type/veterinary/veterinary";
import Image from "next/image"
import { FaPlus } from "react-icons/fa";
export function VeterinaryCardSkeleton() {
    return (
        <div className="flex flex-col gap-4 p-3.5 bg-surface-container dark:bg-dark-surface-container rounded-4xl text-on-surface dark:text-dark-on-surface text-title-large animate-pulse">
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <div className="size-28 rounded-full bg-on-surface-variant/20 dark:bg-dark-on-surface-variant/20 flex items-center justify-center">
                        <FaPlus className="text-3xl text-on-surface-variant dark:text-dark-on-surface-variant animate-bounce" />
                    </div>
                </div>
                <div className="h-6 w-32 bg-on-surface-variant/20 dark:bg-dark-on-surface-variant/20 rounded" />
            </div>
            <div className="flex flex-col gap-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <div className="h-4 w-20 bg-on-surface-variant/20 dark:bg-dark-on-surface-variant/20 rounded" />
                        <div className="h-3 w-28 bg-on-surface-variant/10 dark:bg-dark-on-surface-variant/10 rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function VeterinaryCard({ veterinary }: { veterinary: Veterinary }) {
    return (
        <div
            className="flex flex-col gap-4 p-3.5 bg-surface-container dark:bg-dark-surface-container rounded-4xl text-on-surface dark:text-dark-on-surface text-title-large"
        >
            <div
                className="flex flex-col items-center gap-4"
            >
                <Image src={'/veterinary.jpg'} alt="veterinary" className="size-28 rounded-full" width={500} height={500} />
                <h1
                    className="text-title-large "
                >
                    {`${veterinary.name} ${veterinary.last}`}
                </h1>
            </div>
            <div
                className="flex flex-col gap-4"
            >
                <VeterinaryCardItem title="Address" value={veterinary.clinic_location} />
                <VeterinaryCardItem title="Wilaya | Baladiaya" value={`${veterinary.baladiya.wilaya.name} ${veterinary.baladiya.name}`} />
                <VeterinaryCardItem title="Phone" value={`${veterinary.phone}`} />
                <VeterinaryCardItem title="Email" value={`${veterinary.email}`} />
            </div>
        </div>
    )
}


export function VeterinaryCardItem({ title, value }: { title: string, value: string }) {
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