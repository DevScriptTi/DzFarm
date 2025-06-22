import { DashContentStat, DashContentStatItem } from "@/components/DashCrudContent";
import { getAnimals } from "@/lib/server/actions/animals/getAnimals";
import { UserCog } from "lucide-react";

export default async function AnimalStat() {
    const animals = await getAnimals()
    return (
        <DashContentStat>
            <DashContentStatItem title="Animals" value={animals?.data.total.toString()} icon={<UserCog size={80} />} />
        </DashContentStat>
    )
}