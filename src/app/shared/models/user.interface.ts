export interface User {
    id?: number;
    name: string;
    lastname: string;
    username: string;
    password: string;
    created_at?: Date;
    role: string;
}