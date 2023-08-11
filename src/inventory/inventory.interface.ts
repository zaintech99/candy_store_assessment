export interface IInventory {
    inventory_id?: number;
    inventory_name: string;
    manufacture_date: Date;
    available_quantity: number;
}


export interface IInventoryListResponse {
    page: number,
    limit: number,
    total: number,
    pages: number,
    results: IInventory[]
}