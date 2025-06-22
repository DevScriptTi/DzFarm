"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { Input } from "@/components/Inputs/inputs";
import Button from "@/components/Buttons/Button";
import { Animal, AnimalType } from "@/lib/server/type/animal/animal";
import { updateAnimal } from "@/lib/server/actions/animals/animalAction";
import { SimpleSelect } from "@/components/Inputs/SimpleSelect";
import { useState } from "react";
import { getAnimalType } from "@/lib/server/actions/animals/getAnimal";

const updateAnimalSchema = z.object({
    gender: z.enum(["male", "female"]),
    weight: z.string(),
    date_of_birth: z.string(),
    animal_type_id: z.string(),
    price: z.string(),
});

type UpdateAnimalFormData = z.infer<typeof updateAnimalSchema>;

interface UpdateAnimalFormProps {
    animal: Animal;
}

export default function UpdateAnimalForm({ animal }: UpdateAnimalFormProps) {
    const [animalTypes, setAnimalTypes] = useState<AnimalType[]>();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<UpdateAnimalFormData>({
        resolver: zodResolver(updateAnimalSchema),
        defaultValues: {
            gender: animal.gender,
            weight: animal.weight.toString(),
            date_of_birth: animal.date_of_birth,
            animal_type_id: animal.animal_type_id.toString(),
            price: animal.price.toString(),
        },
    });

    const onSubmit = async (data: UpdateAnimalFormData) => {
        const fetchAnimalTypes = async () => {
            const response = await getAnimalType()
            setAnimalTypes(response)
        }
        try {
            await updateAnimal(animal.id, data);

        } catch (error) {
            console.error('Error updating animal:', error);
        }
        fetchAnimalTypes()
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-md">
            {isSubmitSuccessful && (
                <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-lg">
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <p className="font-medium text-green-800 dark:text-green-200">Animal updated successfully!</p>
                </div>
            )}
            <SimpleSelect
                register={register('gender')}
                label="gender"
                title="Gender"
                error={errors.gender?.message}
            >
                <option value={undefined}>
                    Chosse Gander
                </option>
                <option value="male">
                    Male
                </option>
                <option value="female">
                    Female
                </option>
            </SimpleSelect>
            <Input
                label="weight"
                title="Weight"
                placeholder="Enter weight of the sheep "
                error={errors.weight?.message}
                register={register}
            />
            <Input
                label="date_of_birth"
                title="Date of birth"
                placeholder="Enter date of birth  of the sheep "
                error={errors.date_of_birth?.message}
                type="date"
                register={register}
            />
            <Input
                label="price"
                title="Price"
                placeholder="Enter Price  of the sheep "
                error={errors.price?.message}
                register={register}
            />
            <SimpleSelect
                register={register('animal_type_id')}
                label="animal_type_id"
                title="Animal Type"
                error={errors.animal_type_id?.message}
            >
                <option value={undefined}>
                    Chosse Type
                </option>
                {

                    animalTypes?.map(animalType => (
                        <option key={animalType.id} value={animalType.id}>
                            {animalType.name}
                        </option>
                    ))
                }
            </SimpleSelect>

            <Button
                type="submit"
                mode="filled"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Updating..." : "Update Animal"}
            </Button>
        </form>
    );
}
