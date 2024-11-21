enum BikeTypes {
    'Mountain',
    'Road',
    'Hybrid',
    'Electric'
}

interface Bike {
    name:string;
    brand:string;
    price:number;
    category: BikeTypes;
    description:string;
    quantity:number;
    inStock:boolean
}