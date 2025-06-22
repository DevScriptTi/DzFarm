"use server";
import Link from "next/link";
import { Pencil } from "lucide-react";
import DeleteVeterinary from "./delete";
import { Veterinary  } from "@/lib/server/type/veterinary/veterinary";

export default async function VeterinaryActions({ veterinary }: { veterinary: Veterinary }) {
    return (
        <div
            className="flex items-center gap-1"
        >
            <Link href={`/dashboard/veterinarys/${veterinary.id}`}>
                <Pencil className="text-green-700 dark:text-green-400" size={16} />
            </Link>
            <DeleteVeterinary veterinary={veterinary} />
        </div>
    )
}