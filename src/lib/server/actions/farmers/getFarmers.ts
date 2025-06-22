'use server'

import axiosInstance from '@/lib/server/tools/axios'
import { FarmersResponse } from '../../type/farmer/farmer'

export async function getFarmers(page: number = 1): Promise<FarmersResponse> {
    try {
        const { data } = await axiosInstance.get<FarmersResponse>(`/farmers?page=${page}`)
        return data
    } catch (error: unknown) {
        if (error && typeof error === 'object' && 'response' in error) {
            // @ts-expect-error: error.response may exist
            console.error('Error fetching farmers:', error.response?.data)
            // @ts-expect-error: error.response may exist
            throw error.response?.data
        }
        throw error
    }
}