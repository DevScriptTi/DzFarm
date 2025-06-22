import { getFarmer } from "@/lib/server/actions/farmers/getFarmer";
import UpdateFarmerForm from "./UpdateForm";
import { Suspense } from "react";
import FarmerUpdateSkeleton from "./Farmer/FarmerUpdateSkeleton";

export default async function UpdateFarmer({ farmer }: { farmer: number }) {
    return (
        <Suspense fallback={<FarmerUpdateSkeleton />}>
            <UpdateFarmerContent farmer={farmer} />
        </Suspense>
    );
}

async function UpdateFarmerContent({ farmer }: { farmer: number }) {
    const farmer_ = await getFarmer(Number(farmer));

    return <UpdateFarmerForm farmer={farmer_} />;
}
