"use server";
import Link from "next/link";
import { Eye, Pencil } from "lucide-react";
import DeleteAnimal from "./delete";
import { Animal } from "@/lib/server/type/animal/animal";

export default async function AnimalActions({ animal }: { animal: Animal }) {
    return (
        <div
            className="flex items-center gap-1"
        >
            <Link href={`/farmers/animals/edit/${animal.id}`}>
                <Pencil className="text-green-700 dark:text-green-400" size={16} />
            </Link>
            <Link href={`/farmers/animals/view/${animal.id}`}>
                <Eye className="text-indigo-700 dark:text-indigo-400" size={16} />
            </Link>
            <DeleteAnimal animal={animal} />
        </div>
    )
}