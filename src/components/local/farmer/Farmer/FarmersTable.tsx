import { getFarmers } from "@/lib/server/actions/farmers/getFarmers";
import FarmerActions from "../actions";
import CreateKey from "../creactKey";
import { DashContentTable, TableTd, TableTdMain, TableThead, TableTr } from "@/components/DashCrudContent";

interface FarmersTableProps {
    page: string;
}

export default async function FarmersTable({ page }: FarmersTableProps) {
    const currentPage = parseInt(page) || 1;
    const farmers = await getFarmers(currentPage);

    return (
        <>
            <DashContentTable>
                <TableThead list={['Username', 'name', 'last', 'Key', 'Email', 'Settings']} />
                <tbody>
                    {farmers?.data.data.map((farmer) => (
                        <TableTr key={farmer.id}>
                            <TableTdMain value={farmer.username} />
                            <TableTd>
                                {farmer.name}
                            </TableTd>
                            <TableTd>
                                {farmer.last}
                            </TableTd>
                            <TableTd>
                                {farmer.key?.value || <CreateKey farmer={farmer} />}
                            </TableTd>
                            <TableTd>
                                {farmer.key?.user?.email || 'No Account'}
                            </TableTd>
                            <TableTd>
                                <FarmerActions farmer={farmer} />
                            </TableTd>
                        </TableTr>
                    ))}
                </tbody>
            </DashContentTable>
        </>
    )
}

