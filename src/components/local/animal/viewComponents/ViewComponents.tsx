import Image from "next/image";

export default function AnimalViewHead({ qrCode, slug }: { qrCode: string | null, slug: string }) {
    return (
        <div
            className="flex gap-2 items-start"
        >
            <div className="rounded-2xl bg-white">
                <Image
                    className="w-32"
                    src={qrCode ?? '/qrCode.png'} alt="Animal QrCode"
                    width={500} height={500}
                />
            </div>
            <h1 className="text-title-large text-on-surface dark:text-dark-on-surface">
                Id : {slug}
            </h1>
        </div>
    )
}

export function AnimalViewItem({ title, value }: { title: string, value: string }) {
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