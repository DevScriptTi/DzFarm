"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { CheckCircle2, Weight } from "lucide-react";
import { Input } from "@/components/Inputs/inputs";
import Button from "@/components/Buttons/Button";
import { createAnimal } from "@/lib/server/actions/animals/animalAction";
import { SimpleSelect } from "@/components/Inputs/SimpleSelect";
import { AnimalType } from "@/lib/server/type/animal/animal";
import { getAnimalType } from "@/lib/server/actions/animals/getAnimal";
import Link from "next/link";
import { useLocale } from "next-intl";

const createAnimalSchema = z.object({
    gender: z.enum(["male", "female"]),
    weight: z.string(),
    date_of_birth: z.string(),
    animal_type_id: z.string(),
    price: z.string(),
});

type CreateAnimalFormData = z.infer<typeof createAnimalSchema>;

export default function CreateAnimalForm() {
    const router = useRouter();
    const [animalTypes, setAnimalTypes] = useState<AnimalType[]>();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<CreateAnimalFormData>({
        resolver: zodResolver(createAnimalSchema),
    });

    useEffect(() => {
        const fetchAnimalTypes = async () => {
            const response = await getAnimalType()
            setAnimalTypes(response)
        }
        if (isSubmitSuccessful) {
            const timer = setTimeout(() => {
                router.refresh();
                router.push('/dashboard');
            }, 2000);
            return () => clearTimeout(timer);
        }
        fetchAnimalTypes()
    }, [isSubmitSuccessful, router]);

    const onSubmit = async (data: CreateAnimalFormData) => {
        console.log(data)
        try {
            await createAnimal(data);
        } catch (error) {
            console.error('Error creating animal:', error);
        }
    };
    const locale = useLocale()
    console.log(errors)
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-md">
            {isSubmitSuccessful && (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 animate-fade-in">
                    <CheckCircle2 size={20} />
                    <span>Animal created successfully!</span>
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
                {isSubmitting ? "Creating..." : "Create Animal"}
            </Button>
            <div className="text-on-surface dark:text-dark-on-surface">
                <Link href={`/${locale}/farmers`} className="decoration-on-surface dark:decoration-dark-on-surface decoration-1">
                    Back To Animal Page
                </Link>
            </div>
        </form>
    );
}