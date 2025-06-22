"use client";

import { deleteAnimal } from "@/lib/server/actions/animals/animalAction"; 
import { Animal } from "@/lib/server/type/animal/animal";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteAnimalProps {
    animal: Animal;
}

export default function DeleteAnimal({ animal }: DeleteAnimalProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await deleteAnimal(animal.id);
            router.refresh();
        } catch (error) {
            console.error('Error deleting animal:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`
                text-red-700 dark:text-red-400 
                hover:text-red-800 dark:hover:text-red-300 
                disabled:opacity-50
                transition-all duration-200
                ${isDeleting ? 'animate-spin' : ''}
            `}
        >
            <Trash2 size={16} />
        </button>
    );
}