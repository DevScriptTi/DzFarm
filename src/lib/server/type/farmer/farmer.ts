export interface FarmersResponse {
    status: boolean;
    message: string;
    data: {
        current_page: number;
        data: Farmer[];
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

export interface Farmer {
    id: number;
    username: string;
    name: string;
    last: string;
    phone: string;
    date_of_birth: string;
    created_at: string;
    updated_at: string;
    farm: Farm | null;
    key: Key | null;
    picture: string | null;
}

export interface Farm {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    mechta_id: number;
    farmer_id: number;
    mechta: Mechta;
}

export interface Mechta {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    baladiya_id: number;
    baladiya: Baladiya;
}

export interface Baladiya {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    wilaya_id: number;
    wilaya: Wilaya;
}

export interface Wilaya {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
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

export interface CreateFarmerRequest {
    name: string;
    last: string;
    farm_name: string;
    phone: string;
    date_of_birth: string; // Format: YYYY-MM-DD
    mechta_id: string;
}

export interface CreateFarmerErrorResponse {
    message: string;
    errors: {
        name?: string[];
        last?: string[];
        farm_name?: string[];
        phone?: string[];
        date_of_birth?: string[];
        mechta_id?: string[];
    };
}

export interface CreateFarmerSuccessResponse {
    status: boolean;
    message: string;
    data: {
        name: string;
        username: string;
        last: string;
        phone: string;
        date_of_birth: string;
        updated_at: string;
        created_at: string;
        id: number;
        farm: {
            id: number;
            name: string;
            created_at: string;
            updated_at: string;
            mechta_id: number;
            farmer_id: number;
            mechta: {
                id: number;
                name: string;
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
            };
        };
        key: null;
        picture: null;
    };
}


export interface UpdateFarmerRequest {
    name?: string;
    last?: string;
    farm_name?: string;
    phone?: string;
    date_of_birth?: string; // Format: YYYY-MM-DD
    mechta_id?: number;
}

export interface UpdateFarmerSuccessResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        name: string;
        last: string;
        username: string;
        phone: string;
        date_of_birth: string;
        updated_at: string;
        created_at: string;
        farm: {
            id: number;
            name: string;
            created_at: string;
            updated_at: string;
            mechta_id: number;
            farmer_id: number;
            mechta: {
                id: number;
                name: string;
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
            };
        };
        key: null | Key; // Key can be null or an object
        picture: null | string; // Picture can be null or a URL
    };
}

export interface UpdateFarmerErrorResponse {
    message: string;
    errors: {
        name?: string[];
        last?: string[];
        farm_name?: string[];
        phone?: string[];
        date_of_birth?: string[];
        mechta_id?: string[];
    };
}

