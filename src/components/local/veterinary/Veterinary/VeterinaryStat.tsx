import { DashContentStat, DashContentStatItem } from "@/components/DashCrudContent";
import { getVeterinarys } from "@/lib/server/actions/veterinarys/getVeterinarys";
import { UserCog } from "lucide-react";

export default async function VeterinaryStat() {
    const veterinarys = await getVeterinarys()
    return (
        <DashContentStat>
            <DashContentStatItem title="Veterinarys" value={veterinarys?.data.total.toString()} icon={<UserCog size={80} />} />
        </DashContentStat>
    )
}