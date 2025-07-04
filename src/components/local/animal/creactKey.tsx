"use client";

import { createAnimalKey } from "@/lib/server/actions/animals/animalAction"; 
import { Animal } from "@/lib/server/type/animal/animal";
import { KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CreateKeyProps {
    animal: Animal;
}

export default function CreateKey({ animal }: CreateKeyProps) {
    const router = useRouter();
    const [isCreating, setIsCreating] = useState(false);

    const handleCreate = async () => {
        try {
            setIsCreating(true);
            await createAnimalKey(animal.id);
            router.refresh();
        } catch (error) {
            console.error('Error creating key:', error);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <button
            onClick={handleCreate}
            disabled={isCreating}
            className={`
                text-green-700 dark:text-green-400 
                hover:text-green-800 dark:hover:text-green-300 
                disabled:opacity-50
                transition-all duration-200
                ${isCreating ? 'animate-spin' : ''}
            `}
        >
            <KeyRound size={16} />
        </button>
    );
}