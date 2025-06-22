'use server'

import axiosInstance from '@/lib/server/tools/axios'
import { Farmer } from '../../type/farmer/farmer';

interface GetFarmerResponse {
    message: string;
    farmer: Farmer;
}

export async function getFarmer(id: number): Promise<Farmer> {
    try {
        const { data } = await axiosInstance.get<GetFarmerResponse>(
            `/farmers/${id}`
        )
        return data.farmer
    } catch (error: unknown) {
        console.error('Error fetching farmer:', error)
        throw error
    }
}