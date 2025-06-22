import Button from "@/components/Buttons/Button";
import { DashContentAction, DashContenTitle, DashContentPaginationSkeleton, DashContentStatItemSkeleton, DashContentTableSkeleton } from "@/components/DashCrudContent";
import AnimalPagination from "@/components/local/animal/Animal/AnimalPagination";
import AnimalsTable from "@/components/local/animal/Animal/AnimalsTable";
import AnimalStat from "@/components/local/animal/Animal/AnimalStat"; 
import DashSection from "@/components/Section/Section";
import { getAnimals } from "@/lib/server/actions/animals/getAnimals"; 
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

interface PageProps {
    searchParams: Promise<{ page?: string }>
}

export default async function AnimalPage({ searchParams }: PageProps) {
    const page = (await searchParams).page || "1";
    const animals = await getAnimals(parseInt(page));

    return (
        <DashSection>
            <DashContenTitle>Animals</DashContenTitle>
            <Suspense fallback={<DashContentStatItemSkeleton />}>
                <AnimalStat />
            </Suspense>
            <DashContentAction>
                <CreateAnimal />
            </DashContentAction>
            <Suspense fallback={<DashContentTableSkeleton />}>
                <AnimalsTable page={page} />
            </Suspense>
            <Suspense fallback={<DashContentPaginationSkeleton />}>
                <AnimalPagination data={animals} currentPage={parseInt(page)} />
            </Suspense>
        </DashSection>
    )
}

function CreateAnimal() {
    return (
        <Link href="/farmers/animals/create">
            <Button mode="filled" icon={<Plus />}>
                Create Animal
            </Button>
        </Link>
    )
}