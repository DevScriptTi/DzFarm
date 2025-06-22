import { getAnimals } from "@/lib/server/actions/animals/getAnimals";
import AnimalActions from "../actions";
import CreateKey from "../creactKey";
import { DashContentTable, TableTd, TableTdMain, TableThead, TableTr } from "@/components/DashCrudContent";

interface AnimalsTableProps {
    page: string;
}

export default async function AnimalsTable({ page }: AnimalsTableProps) {
    const currentPage = parseInt(page) || 1;
    const animals = await getAnimals(currentPage);

    return (
        <>
            <DashContentTable>
                <TableThead list={['slug', "animal_type", 'gender', 'weight', 'date_of_birth', 'farme->farmer', 'location', 'Settings']} />
                <tbody>
                    {animals?.data.data.map((animal) => (
                        <TableTr key={animal.id}>
                            <TableTdMain value={animal.slug} />
                            <TableTd>
                                {animal.animal_type.name}
                            </TableTd>
                            <TableTd>
                                {animal.gender}
                            </TableTd>
                            <TableTd>
                                {animal.weight}
                            </TableTd>
                            <TableTd>
                                {animal.date_of_birth}
                            </TableTd>
                            <TableTd>
                                <div
                                    className="flex flex-col gap-1"
                                >
                                    <span>farm : {animal.farm.name}</span>
                                    <span>farmer : {animal.farm.farmer.name} - {animal.farm.farmer.last}</span>
                                </div>
                            </TableTd>
                            <TableTd>
                                {animal.farm.mechta.name} - {animal.farm.mechta.baladiya.name} - {animal.farm.mechta.baladiya.wilaya.name}
                            </TableTd>
                            <TableTd>
                                <AnimalActions animal={animal} />
                            </TableTd>
                        </TableTr>
                    ))}
                </tbody>
            </DashContentTable>
        </>
    )
}

