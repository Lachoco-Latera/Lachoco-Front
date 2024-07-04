export interface IOrders {
    id?: string,
    date?: string,
    status?: string,
    orderDetail?: IOrderDetail
    user?: IUser
}

export interface IOrderDetail {
    id?: string,
    price?: string,
    orderDetailProducts?: IOrderDetailProducts[]
}

export interface IOrderDetailProducts {
    id?: string,
    cantidad?: number,
    pickedFlavors?:string[],
    product?: IProduct,
    orderDetailFlavors: []
}

export interface IProduct {
    id?: string,
    name?: string,
    presentacion?: number,
    descriocion?: string,
    price?: string,
    currency?: string,
    label?: string,
    isActive?: boolean,
    category?: ICategory,
}

export interface ICategory {
    id?: string,
    name?: string
}

export interface IUser {
    id?: string,
    name?: string,
    lastname?: string,
    email?: string,
    country?: string,
    password?: string,
    role?: string,
    isActive?: boolean,
    suscriptionId?: null //agregar el tipo en el caso de que no sea null ej: null | string
    cusomerId?: null //lo mismo que con suscripcion
}

// --------------------------------------------------------------------------
// F L A V O R  S T A T E

export interface IFlavor {
    id?: string,
    name?: string,
    stock?: number
}