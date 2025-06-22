import { getVeterinary } from "@/lib/server/actions/veterinarys/getVeterinary";
import UpdateVeterinaryForm from "./UpdateForm";
import { Suspense } from "react";
import VeterinaryUpdateSkeleton from "./Veterinary/VeterinaryUpdateSkeleton"; 

export default async function UpdateVeterinary({ veterinary }: { veterinary: number }) {
    return (
        <Suspense fallback={<VeterinaryUpdateSkeleton />}>
            <UpdateVeterinaryContent veterinary={veterinary} />
        </Suspense>
    );
}

async function UpdateVeterinaryContent({ veterinary }: { veterinary: number }) {
    const veterinary_ = await getVeterinary(Number(veterinary));

    return <UpdateVeterinaryForm veterinary={veterinary_} />;
}
