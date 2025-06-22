import { getVeterinarys } from "@/lib/server/actions/veterinarys/getVeterinarys";
import VeterinaryActions from "../actions";
import CreateKey from "../creactKey";
import { DashContentTable, TableTd, TableTdMain, TableThead, TableTr } from "@/components/DashCrudContent";

interface VeterinarysTableProps {
    page: string;
}

export default async function VeterinarysTable({ page }: VeterinarysTableProps) {
    const currentPage = parseInt(page) || 1;
    const veterinarys = await getVeterinarys(currentPage);

    return (
        <>
            <DashContentTable>
                <TableThead list={['Username', 'name', 'last', 'Key', 'Email', 'Settings']} />
                <tbody>
                    {veterinarys?.data.data.map((veterinary) => (
                        <TableTr key={veterinary.id}>
                            <TableTdMain value={veterinary.username} />
                            <TableTd>
                                {veterinary.name}
                            </TableTd>
                            <TableTd>
                                {veterinary.last}
                            </TableTd>
                            <TableTd>
                                {veterinary.key?.value || <CreateKey veterinary={veterinary} />}
                            </TableTd>
                            <TableTd>
                                {veterinary.key?.user?.email || 'No Account'}
                            </TableTd>
                            <TableTd>
                                <VeterinaryActions veterinary={veterinary} />
                            </TableTd>
                        </TableTr>
                    ))}
                </tbody>
            </DashContentTable>
        </>
    )
}

