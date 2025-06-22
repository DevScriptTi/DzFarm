"use server";

import axios from "axios";
import { AnimalsResponse } from "../../type/animal/animal";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

export async function getAllAnimals(page: number = 1): Promise<AnimalsResponse> {
    try {
        const { data } = await axiosInstance.get<AnimalsResponse>(`/allAnimals?page=${page}`)
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

