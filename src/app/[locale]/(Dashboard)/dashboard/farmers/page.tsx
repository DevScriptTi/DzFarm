import Button from "@/components/Buttons/Button";
import { DashContentAction, DashContenTitle, DashContentPaginationSkeleton, DashContentStatItemSkeleton, DashContentTableSkeleton } from "@/components/DashCrudContent";
import FarmerPagination from "@/components/local/farmer/Farmer/FarmerPagination";
import FarmersTable from "@/components/local/farmer/Farmer/FarmersTable";
import FarmerStat from "@/components/local/farmer/Farmer/FarmerStat";
import DashSection from "@/components/Section/Section";
import { getFarmers } from "@/lib/server/actions/farmers/getFarmers";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

interface PageProps {
    searchParams: Promise<{ page?: string }>
}

export default async function FarmerPage({ searchParams }: PageProps) {
    const page = (await searchParams).page || "1";
    const farmers = await getFarmers(parseInt(page));

    return (
        <DashSection>
            <DashContenTitle>Farmers</DashContenTitle>
            <Suspense fallback={<DashContentStatItemSkeleton />}>
                <FarmerStat />
            </Suspense>
            <DashContentAction>
                <CreateFarmer />
            </DashContentAction>
            <Suspense fallback={<DashContentTableSkeleton />}>
                <FarmersTable page={page} />
            </Suspense>
            <Suspense fallback={<DashContentPaginationSkeleton />}>
                <FarmerPagination data={farmers} currentPage={parseInt(page)} />
            </Suspense>
        </DashSection>
    )
}

function CreateFarmer() {
    return (
        <Link href="/dashboard/farmers/create">
            <Button mode="filled" icon={<Plus />}>
                Create Farmer
            </Button>
        </Link>
    )
}