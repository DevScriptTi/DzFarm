import { DashContentPagination, DashContentPaginationItem } from "@/components/DashCrudContent";
import { getFarmers } from "@/lib/server/actions/farmers/getFarmers";
import { FarmersResponse } from "@/lib/server/type/farmer/farmer";

interface FarmerPaginationProps {
    data: FarmersResponse;
    currentPage: number;
}

export default async function FarmerPagination({ currentPage }: FarmerPaginationProps) {
    const data = await getFarmers(currentPage);

    return (
        <DashContentPagination>
            {/* Previous button */}
            {data.data.prev_page_url && (
                <DashContentPaginationItem
                    href={`/dashboard/farmers?page=${currentPage - 1}`}
                >
                    Previous
                </DashContentPaginationItem>
            )}

            {/* Page numbers */}
            {data.data.links.slice(1, -1).map((link, index) => (
                link.url && (
                    <DashContentPaginationItem
                        key={index}
                        href={`/dashboard/farmers?page=${index + 1}${currentPage === index + 1 ? '&active' : ''}`}
                    >
                        {link.label}
                    </DashContentPaginationItem>
                )
            ))}

            {/* Next button */}
            {data.data.next_page_url && (
                <DashContentPaginationItem
                    href={`/dashboard/farmers?page=${currentPage + 1}`}
                >
                    Next
                </DashContentPaginationItem>
            )}
        </DashContentPagination>
    )
}