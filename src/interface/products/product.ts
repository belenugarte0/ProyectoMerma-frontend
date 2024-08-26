export interface IProduct {
    id:          number;
    name:        string;
    description: string;
    stock:       number;
    slug:        string;
    price:       number;
    image:       null;
    category:    IProductCategory;
    createdAt:   string;
}

export interface IProductCategory {
    id:   number;
    name: string;
    slug: string;
}