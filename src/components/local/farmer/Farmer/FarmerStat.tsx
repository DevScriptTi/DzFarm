import { DashContentStat, DashContentStatItem } from "@/components/DashCrudContent";
import { getFarmers } from "@/lib/server/actions/farmers/getFarmers";
import { UserCog } from "lucide-react";

export default async function FarmerStat() {
    const farmers = await getFarmers()
    return (
        <DashContentStat>
            <DashContentStatItem title="Farmers" value={farmers?.data.total.toString()} icon={<UserCog size={80} />} />
        </DashContentStat>
    )
}