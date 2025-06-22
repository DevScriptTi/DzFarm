"use client";

import { deleteVeterinary } from "@/lib/server/actions/veterinarys/veterinaryAction"; 
import { Veterinary } from "@/lib/server/type/veterinary/veterinary";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteVeterinaryProps {
    veterinary: Veterinary;
}

export default function DeleteVeterinary({ veterinary }: DeleteVeterinaryProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await deleteVeterinary(veterinary.id);
            router.refresh();
        } catch (error) {
            console.error('Error deleting veterinary:', error);
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