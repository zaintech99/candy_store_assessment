export interface IStore {
  store_id?: number;
  store_address: string;
  store_manager_name: string;
}


export interface IStoreListResponse {
  page: number,
  limit: number,
  total: number,
  pages: number,
  results: IStore[]
}