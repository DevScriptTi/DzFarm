export interface VeterinarysResponse {
    status: boolean;
    message: string;
    data: {
        current_page: number;
        data: Veterinary[];
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        links: PaginationLink[];
        next_page_url: string | null;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number;
        total: number;
    };
}

export interface Veterinary {
    id: number;
    name: string;
    last: string;
    username: string;
    phone: string;
    email: string;
    academic_degree: string;
    license_number: string;
    clinic_location: string;
    created_at: string;
    updated_at: string;
    baladiya_id: number;
    baladiya: {
        id: number;
        name: string;
        created_at: string;
        updated_at: string;
        wilaya_id: number;
        wilaya: {
            id: number;
            name: string;
            created_at: string;
            updated_at: string;
        };
    };
    key: Key;
    photo: null;
}

export interface Key {
    id: number;
    value: string;
    status: 'used' | 'unused';
    keyable_type: string;
    keyable_id: number;
    created_at: string;
    updated_at: string;
    user: User | null;
}

export interface User {
    id: number;
    email: string;
    phone: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    key_id: number;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface CreateVeterinaryRequest {
    name: string;
    last: string;
    phone: string;
    email: string;
    academic_degree: string;
    license_number: string;
    clinic_location: string;
    mechta_id: number;
}

export interface CreateVeterinarySuccessResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        name: string;
        last: string;
        username: string;
        phone: string;
        email: string;
        academic_degree: string;
        license_number: string;
        clinic_location: string;
        created_at: string;
        updated_at: string;
        baladiya_id: number;
        baladiya: {
            id: number;
            name: string;
            created_at: string;
            updated_at: string;
            wilaya_id: number;
            wilaya: {
                id: number;
                name: string;
                created_at: string;
                updated_at: string;
            };
        };
        key: null;
        photo: null;
    };
}

export interface CreateVeterinaryErrorResponse {
    message: string;
    errors: {
        name?: string[];
        last?: string[];
        phone?: string[];
        email?: string[];
        academic_degree?: string[];
        license_number?: string[];
        clinic_location?: string[];
        mechta_id?: string[];
    };
}

export interface UpdateVeterinaryRequest {
    name?: string;
    last?: string;
    phone?: string;
    email?: string;
    academic_degree?: string;
    license_number?: string;
    clinic_location?: string;
    mechta_id?: number;
}

export interface UpdateVeterinarySuccessResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        name: string;
        last: string;
        username: string;
        phone: string;
        email: string;
        academic_degree: string;
        license_number: string;
        clinic_location: string;
        created_at: string;
        updated_at: string;
        baladiya_id: number;
        baladiya: {
            id: number;
            name: string;
            created_at: string;
            updated_at: string;
            wilaya_id: number;
            wilaya: {
                id: number;
                name: string;
                created_at: string;
                updated_at: string;
            };
        };
        key: null;
        photo: null;
    };
}

export interface UpdateVeterinaryErrorResponse {
    message: string;
    errors: {
        name?: string[];
        last?: string[];
        phone?: string[];
        email?: string[];
        academic_degree?: string[];
        license_number?: string[];
        clinic_location?: string[];
        mechta_id?: string[];
    };
}

