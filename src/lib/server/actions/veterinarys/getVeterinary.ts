'use server'

import axiosInstance from '@/lib/server/tools/axios'
import { Veterinary } from '../../type/veterinary/veterinary';

interface GetVeterinaryResponse {
    message: string;
    veterinary: Veterinary;
}

export async function getVeterinary(id: number): Promise<Veterinary> {
    try {
        const { data } = await axiosInstance.get<GetVeterinaryResponse>(
            `/veterinarys/${id}`
        )
        return data.veterinary
    } catch (error: unknown) {
        console.error('Error fetching veterinary:', error)
        throw error
    }
}