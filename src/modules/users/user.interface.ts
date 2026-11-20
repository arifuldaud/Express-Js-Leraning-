


export interface IUser {
    id?: number;
    name: string;
    age?: number | null;
    password: string;
    email: string;
    is_active?: boolean;
    created_at?: Date;
    updated_at?: Date;
}