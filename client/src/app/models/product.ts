export interface Product{
    id: number;
    name: string;
    description: string;
    price: number;
    picUrl: string;
    type?: string;
    brand: string;
    quantity?: number;
}

export interface ProductParams{
    orderBy: string;
    searchTerm?: string;
    types: string[];
    brands: string[];
    pageNumber: number;
    pageSize: number;
}