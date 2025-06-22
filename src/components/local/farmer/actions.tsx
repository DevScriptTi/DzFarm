"use server";
import Link from "next/link";
import { Pencil } from "lucide-react";
import DeleteFarmer from "./delete";
import { Farmer } from "@/lib/server/type/farmer/farmer";

export default async function FarmerActions({ farmer }: { farmer: Farmer }) {
    return (
        <div
            className="flex items-center gap-1"
        >
            <Link href={`/dashboard/farmers/${farmer.id}`}>
                <Pencil className="text-green-700 dark:text-green-400" size={16} />
            </Link>
            <DeleteFarmer farmer={farmer} />
        </div>
    )
}