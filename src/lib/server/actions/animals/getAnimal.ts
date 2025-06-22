'use server'

import axiosInstance from '@/lib/server/tools/axios'
import { Animal, AnimalType } from '../../type/animal/animal';

interface GetAnimalResponse {
    message: string;
    animal: Animal;
}

export async function getAnimal(id: number): Promise<Animal> {
    try {
        const { data } = await axiosInstance.get<GetAnimalResponse>(
            `/animals/${id}`
        )
        return data.animal
    } catch (error: unknown) {
        console.error('Error fetching animal:', error)
        throw error
    }
}

export async function getAnimalType(): Promise<AnimalType[]> {
    try {
        const { data } = await axiosInstance.get<AnimalType[]>(
            `/animalTypes`
        )
        return data
    } catch (error: unknown) {
        console.error('Error fetching animal:', error)
        throw error
    }
}