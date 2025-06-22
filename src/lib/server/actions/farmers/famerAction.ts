'use server'

import axiosInstance from '@/lib/server/tools/axios'
import { revalidatePath } from 'next/cache'
import { CreateFarmerErrorResponse, CreateFarmerRequest, Farmer } from '../../type/farmer/farmer'

export async function createFarmer(farmerData: CreateFarmerRequest): Promise<Farmer | CreateFarmerErrorResponse> {
    try {
        const { data } = await axiosInstance.post<Farmer>(
            `/farmers`,
            farmerData
        )
        revalidatePath('/dashboard/farmers')
        return data
    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'response' in error ) {
            return (error as { response: { data: CreateFarmerErrorResponse } }).response.data
        }
        throw error
    }
}

export async function updateFarmer(
    id: number,
    farmerData: Partial<CreateFarmerRequest>
): Promise<Farmer | CreateFarmerErrorResponse> {
    try {
        const { data } = await axiosInstance.put<Farmer>(
            `/farmers/${id}`,
            farmerData
        )
        revalidatePath('/dashboard/farmers')
        return data
    } catch (error: unknown) {
        if (
            typeof error === 'object' &&
            error !== null &&
            'response' in error &&
            (error as { response?: { data?: unknown } }).response?.data
        ) {
            return (error as { response: { data: CreateFarmerErrorResponse } }).response.data
        }
        throw error
    }
}

export async function deleteFarmer(id: number): Promise<{ success: boolean }> {
    try {
        await axiosInstance.delete(`/farmers/${id}`)
        revalidatePath('/dashboard/farmers')
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

export async function createFarmerKey(id: number): Promise<{ success: boolean; key?: string }> {
    try {
        await axiosInstance.post<{ key: string }>(`/farmers/${id}/generate-key`)
        revalidatePath('/dashboard/farmers')
        return { success: true }
    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'response' in error ) {
            console.error('Error creating farmer key:', (error as { response: { data: unknown } }).response.data)
        } else {
            console.error('Error creating farmer key:', error)
        }
        throw error
    }
} 