'use server'

import axiosInstance from '@/lib/server/tools/axios'
import { AnimalsResponse } from '../../type/animal/animal'

export async function getAnimals(page: number = 1): Promise<AnimalsResponse> {
    try {
        const { data } = await axiosInstance.get<AnimalsResponse>(`/animals?page=${page}`)
        return data
    } catch (error: unknown) {
        
        if (error && typeof error === 'object' && 'response' in error) {
            // @ts-expect-error: error.response may exist
            console.error('Error fetching animals:', error.response?.data)
            // @ts-expect-error: error.response may exist
            throw error.response?.data
        }
        throw error
    }
}

