import { ICustomer } from "../customer/customer.interface";
import { IInventory } from "../inventory/inventory.interface";
import { IStore } from "../store/store.interface";

export interface IOrder {
    order_id?: number;
    customer: ICustomer | number;
    inventory: IInventory | number;
    store: IStore | number;
    quantity: number;
    status: OrderStatus;
    create_date?: Date;
    update_date?: Date;
}


export interface IOrderListResponse {
    page: number,
    limit: number,
    total: number,
    pages: number,
    results: IOrder[]
}

export enum OrderStatus {
    PROCESSING = 'processing',
    COMPLETED = 'completed',
}