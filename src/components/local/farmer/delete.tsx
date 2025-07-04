"use client";

import { deleteFarmer } from "@/lib/server/actions/farmers/famerAction";
import { Farmer } from "@/lib/server/type/farmer/farmer";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteFarmerProps {
    farmer: Farmer;
}

export default function DeleteFarmer({ farmer }: DeleteFarmerProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await deleteFarmer(farmer.id);
            router.refresh();
        } catch (error) {
            console.error('Error deleting farmer:', error);
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