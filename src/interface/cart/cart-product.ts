export interface ICartProduct {
    id: number;
    name: string;
    image: string | null;
    quantity: number;
    slug: string;
    price: number | string;
}