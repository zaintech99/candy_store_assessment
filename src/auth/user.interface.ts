export interface IUser {
    user_id?: number;
    user_name: string;
    user_email: string;
    password: string;
    token_expire?: number; 
}

