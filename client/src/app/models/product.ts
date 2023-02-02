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