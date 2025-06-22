'use server'

import axiosInstance from '@/lib/server/tools/axios'
import { revalidatePath } from 'next/cache'
import { CreateVeterinaryErrorResponse, CreateVeterinaryRequest, Veterinary } from '../../type/veterinary/veterinary'

export async function createVeterinary(veterinaryData: CreateVeterinaryRequest): Promise<Veterinary | CreateVeterinaryErrorResponse> {
    try {
        const { data } = await axiosInstance.post<Veterinary>(
            `/veterinarys`,
            veterinaryData
        )
        revalidatePath('/dashboard/veterinarys')
        return data
    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'response' in error ) {
            return (error as { response: { data: CreateVeterinaryErrorResponse } }).response.data
        }
        throw error
    }
}

export async function updateVeterinary(
    id: number,
    veterinaryData: Partial<CreateVeterinaryRequest>
): Promise<Veterinary | CreateVeterinaryErrorResponse> {
    try {
        const { data } = await axiosInstance.put<Veterinary>(
            `/veterinarys/${id}`,
            veterinaryData
        )
        revalidatePath('/dashboard/veterinarys')
        return data
    } catch (error: unknown) {
        if (
            typeof error === 'object' &&
            error !== null &&
            'response' in error &&
            (error as { response?: { data?: unknown } }).response?.data
        ) {
            return (error as { response: { data: CreateVeterinaryErrorResponse } }).response.data
        }
        throw error
    }
}

export async function deleteVeterinary(id: number): Promise<{ success: boolean }> {
    try {
        await axiosInstance.delete(`/veterinarys/${id}`)
        revalidatePath('/dashboard/veterinarys')
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

export async function createVeterinaryKey(id: number): Promise<{ success: boolean; key?: string }> {
    try {
        await axiosInstance.post<{ key: string }>(`/veterinarys/${id}/generate-key`)
        revalidatePath('/dashboard/veterinarys')
        return { success: true }
    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'response' in error ) {
            console.error('Error creating veterinary key:', (error as { response: { data: unknown } }).response.data)
        } else {
            console.error('Error creating veterinary key:', error)
        }
        throw error
    }
} 