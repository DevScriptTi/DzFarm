interface AnimalsResponse {
    status: string; // "success" or other status values
    message: string;
    data: {
        current_page: number;
        data: Animal[];
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

interface Animal {
    id: number;
    slug: string;
    gender: "male" | "female";
    price: number;
    weight: number;
    date_of_birth: string; // ISO format date
    created_at: string;
    updated_at: string;
    farm_id: number;
    animal_type_id: number;
    farm: {
        id: number;
        name: string;
        created_at: string;
        updated_at: string;
        mechta_id: number;
        farmer_id: number;
        farmer: {
            id: number;
            username: string;
            name: string;
            last: string;
            phone: string;
            date_of_birth: string;
            created_at: string;
            updated_at: string;
        };
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
    animal_type: {
        id: number;
        slug: string;
        name: string;
        created_at: string;
        updated_at: string;
    };
    qr_code: {
        id: number;
        path: string;
        animal_id: number;
        created_at: string;
        updated_at: string;
        animal?: Animal; // Optional because it's a relation that might not always be loaded
    }
    | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface CreateAnimalRequest {
    gender: "male" | "female";
    weight: string;
    date_of_birth: string;
    price : string ;
    animal_type_id: string;
}

interface CreateAnimalSuccessResponse {
    status: "success" | "error";
    message: string;
    data: {
        id: number;
        slug: string;
        gender: "male" | "female";
        weight: number;
        date_of_birth: string; // ISO format date
        created_at: string;
        updated_at: string;
        farm_id: number;
        animal_type_id: number;
        farm: {
            id: number;
            name: string;
            created_at: string;
            updated_at: string;
            mechta_id: number;
            farmer_id: number;
            farmer: {
                id: number;
                username: string;
                name: string;
                last: string;
                phone: string;
                date_of_birth: string;
                created_at: string;
                updated_at: string;
            };
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
        animal_type: {
            id: number;
            slug: string;
            name: string;
            created_at: string;
            updated_at: string;
        };
        qr_code: {
            id: number;
            path: string;
            animal_id: number;
            created_at: string;
            updated_at: string;
            animal?: Animal; // Optional because it's a relation that might not always be loaded
        }
        | null;
    };
}

interface CreateAnimalErrorResponse {
    message: string;
    errors: {
        gender?: string[];
        weight?: string[];
        date_of_birth?: string[];
        animal_type_id?: string[];
    };
}

interface AnimalType {
    id: string;
    slug: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export type {
    AnimalsResponse,
    Animal,
    PaginationLink,
    CreateAnimalRequest,
    CreateAnimalSuccessResponse,
    CreateAnimalErrorResponse,
    AnimalType
};