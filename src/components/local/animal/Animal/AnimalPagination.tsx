import { DashContentPagination, DashContentPaginationItem } from "@/components/DashCrudContent";
import { getAnimals } from "@/lib/server/actions/animals/getAnimals";
import { AnimalsResponse } from "@/lib/server/type/animal/animal";

interface AnimalPaginationProps {
    data: AnimalsResponse;
    currentPage: number;
}

export default async function AnimalPagination({ currentPage }: AnimalPaginationProps) {
    const data = await getAnimals(currentPage);

    return (
        <DashContentPagination>
            {/* Previous button */}
            {data.data.prev_page_url && (
                <DashContentPaginationItem
                    href={`/dashboard/animals?page=${currentPage - 1}`}
                >
                    Previous
                </DashContentPaginationItem>
            )}

            {/* Page numbers */}
            {data.data.links.slice(1, -1).map((link, index) => (
                link.url && (
                    <DashContentPaginationItem
                        key={index}
                        href={`/dashboard/animals?page=${index + 1}${currentPage === index + 1 ? '&active' : ''}`}
                    >
                        {link.label}
                    </DashContentPaginationItem>
                )
            ))}

            {/* Next button */}
            {data.data.next_page_url && (
                <DashContentPaginationItem
                    href={`/dashboard/animals?page=${currentPage + 1}`}
                >
                    Next
                </DashContentPaginationItem>
            )}
        </DashContentPagination>
    )
}