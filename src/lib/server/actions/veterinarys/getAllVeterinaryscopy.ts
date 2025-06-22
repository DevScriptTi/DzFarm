'use server'

import axios from 'axios';
import { VeterinarysResponse } from '../../type/veterinary/veterinary'

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

export async function getAllVeterinarys(page: number = 1): Promise<VeterinarysResponse> {
    try {
        const { data } = await axiosInstance.get<VeterinarysResponse>(`/allVeterinaries?page=${page}`)
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