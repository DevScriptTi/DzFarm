'use server'

import axiosInstance from '@/lib/server/tools/axios'
import { revalidatePath } from 'next/cache'
import { CreateAnimalErrorResponse, CreateAnimalRequest, Animal } from '../../type/animal/animal'

export async function createAnimal(animalData: CreateAnimalRequest): Promise<Animal | CreateAnimalErrorResponse> {
    try {
        const { data } = await axiosInstance.post<Animal>(
            `/animals`,
            animalData
        )
        revalidatePath('/farmers')
        return data
    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'response' in error ) {
            return (error as { response: { data: CreateAnimalErrorResponse } }).response.data
        }
        throw error
    }
}

export async function updateAnimal(
    id: number,
    animalData: Partial<CreateAnimalRequest>
): Promise<Animal | CreateAnimalErrorResponse> {
    try {
        const { data } = await axiosInstance.put<Animal>(
            `/animals/${id}`,
            animalData
        )
        revalidatePath('/dashboard/animals')
        return data
    } catch (error: unknown) {
        if (
            typeof error === 'object' &&
            error !== null &&
            'response' in error &&
            (error as { response?: { data?: unknown } }).response?.data
        ) {
            return (error as { response: { data: CreateAnimalErrorResponse } }).response.data
        }
        throw error
    }
}

export async function deleteAnimal(id: number): Promise<{ success: boolean }> {
    try {
        await axiosInstance.delete(`/animals/${id}`)
        revalidatePath('/dashboard/animals')
        return { success: true }
    } catch (error: unknown) {
        if (
            typeof error === 'object' &&
            error !== null &&
            'response' in error &&
            (error as { response?: { data?: unknown } }).response?.data
        ) {
            // Optionally handle/log error here
        }
        throw error
    }
}

export async function createAnimalKey(id: number): Promise<{ success: boolean; key?: string }> {
    try {
        await axiosInstance.post<{ key: string }>(`/animals/${id}/generate-key`)
        revalidatePath('/dashboard/animals')
        return { success: true }
    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'response' in error ) {
            console.error('Error creating animal key:', (error as { response: { data: unknown } }).response.data)
        } else {
            console.error('Error creating animal key:', error)
        }
        throw error
    }
} 