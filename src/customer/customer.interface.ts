import { Customer } from "./customer.entity";

export interface ICustomer {
    customer_id?: number;
    customer_name: string;
}

export interface ICustomerListResponse {
    page: number,
    limit: number,
    total: number,
    pages: number,
    results: Customer[]
}