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

export interface IGitfCards {
    id?: string,
    discount?: number,
    img?: string,
    isUsed?: boolean,
    cantidad?: number,
    product?: IProduct,
    code?: string,
}

export interface IRedes {
    id?: string,
    url?: string,
    img?: string,
}


// -------------------------------------------------------------Favorites
export interface IOrdersFavorites {
    cancelByUserId?: null,
    date?: string,
    id?: string,
    label?: string,
    status?: string,
    trackingNumber?: null, 
}

export interface IFavorites {
    country?: string,
    customerId?: null,
    email?: string,
    id?: string | undefined,
    isActive?: boolean,
    lastname?: string,
    name?: string,
    role?: string,
    suscriptionID?: null | string,
    giftcards?: IGitfCards[],
    orders: IOrdersFavorites[]
}

// ---------------------------------------------------P R O D U C T S

export interface IProducts {
    category: ICategories,
    currency?: string,
    description?: string,
    expiryDate?: null,
    flavors: IFlavor[],
    id?: string,
    images?: IImages[],
    isActive?: boolean,
    label?: string,
    name?: string,
    presentacion?: number,
    price?: string,
    purchaseDate?: null,
    status?: string,
}

export interface IImages {
    id?: string,
    img?: string,
}

export interface ICategories {
    icon?: string,
    id?: string,
    name?: string,
}