import Button from "@/components/Buttons/Button";
import { DashContentAction, DashContenTitle, DashContentPaginationSkeleton, DashContentStatItemSkeleton, DashContentTableSkeleton } from "@/components/DashCrudContent";
import VeterinaryPagination from "@/components/local/veterinary/Veterinary/VeterinaryPagination";
import VeterinarysTable from "@/components/local/veterinary/Veterinary/VeterinarysTable";
import VeterinaryStat from "@/components/local/veterinary/Veterinary/VeterinaryStat";
import DashSection from "@/components/Section/Section";
import { getVeterinarys } from "@/lib/server/actions/veterinarys/getVeterinarys";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

interface PageProps {
    searchParams: Promise<{ page?: string }>
}

export default async function VeterinaryPage({ searchParams }: PageProps) {
    const page = (await searchParams).page || "1";
    const veterinarys = await getVeterinarys(parseInt(page));

    return (
        <DashSection>
            <DashContenTitle>Veterinaries</DashContenTitle>
            <Suspense fallback={<DashContentStatItemSkeleton />}>
                <VeterinaryStat />
            </Suspense>
            <DashContentAction>
                <CreateVeterinary />
            </DashContentAction>
            <Suspense fallback={<DashContentTableSkeleton />}>
                <VeterinarysTable page={page} />
            </Suspense>
            <Suspense fallback={<DashContentPaginationSkeleton />}>
                <VeterinaryPagination data={veterinarys} currentPage={parseInt(page)} />
            </Suspense>
        </DashSection>
    )
}

function CreateVeterinary() {
    return (
        <Link href="/dashboard/veterinarys/create">
            <Button mode="filled" icon={<Plus />}>
                Create Veterinary
            </Button>
        </Link>
    )
}