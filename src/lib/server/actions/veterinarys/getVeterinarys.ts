'use server'

import axiosInstance from '@/lib/server/tools/axios'
import { VeterinarysResponse } from '../../type/veterinary/veterinary'

export async function getVeterinarys(page: number = 1): Promise<VeterinarysResponse> {
    try {
        const { data } = await axiosInstance.get<VeterinarysResponse>(`/veterinarys?page=${page}`)
        return data
    } catch (error: unknown) {
        if (error && typeof error === 'object' && 'response' in error) {
            // @ts-expect-error: error.response may exist
            console.error('Error fetching veterinarys:', error.response?.data)
            // @ts-expect-error: error.response may exist
            throw error.response?.data
        }
        throw error
    }
}