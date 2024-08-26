// Generated by https://quicktype.io

export interface ISalesResponse {
    sales: ISale[];
}

export interface ISale {
    id:        number;
    client:    string;
    total:     number;
    user:      ISaleUser;
    products:  ISaleProduct[];
    createdAt: string;
}

export interface ISaleProduct {
    id:       number;
    name:     string;
    slug:     string;
    price:    number;
    category: ISaleCategory;
    image:    string;
    subTotal: number;
    quantity: number;
}

export interface ISaleCategory {
    id:   number;
    slug: string;
    name: string;
}

export interface ISaleUser {
    id:                number;
    name:              string;
    email:             string;
    email_verified_at: null;
    created_at:        string;
    updated_at:        string;
}
