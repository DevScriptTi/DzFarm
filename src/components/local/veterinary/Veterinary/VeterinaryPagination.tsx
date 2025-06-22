import { DashContentPagination, DashContentPaginationItem } from "@/components/DashCrudContent";
import { getVeterinarys } from "@/lib/server/actions/veterinarys/getVeterinarys";
import { VeterinarysResponse } from "@/lib/server/type/veterinary/veterinary";

interface VeterinaryPaginationProps {
    data: VeterinarysResponse;
    currentPage: number;
}

export default async function VeterinaryPagination({ currentPage }: VeterinaryPaginationProps) {
    const data = await getVeterinarys(currentPage);

    return (
        <DashContentPagination>
            {/* Previous button */}
            {data.data.prev_page_url && (
                <DashContentPaginationItem
                    href={`/dashboard/veterinarys?page=${currentPage - 1}`}
                >
                    Previous
                </DashContentPaginationItem>
            )}

            {/* Page numbers */}
            {data.data.links.slice(1, -1).map((link, index) => (
                link.url && (
                    <DashContentPaginationItem
                        key={index}
                        href={`/dashboard/veterinarys?page=${index + 1}${currentPage === index + 1 ? '&active' : ''}`}
                    >
                        {link.label}
                    </DashContentPaginationItem>
                )
            ))}

            {/* Next button */}
            {data.data.next_page_url && (
                <DashContentPaginationItem
                    href={`/dashboard/veterinarys?page=${currentPage + 1}`}
                >
                    Next
                </DashContentPaginationItem>
            )}
        </DashContentPagination>
    )
}