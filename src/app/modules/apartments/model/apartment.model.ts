import {CustomMarker} from './map.model';


export interface FloorplanLight {
    bedrooms: number;
    type: string;
    price: number;
}

export interface FloorplanFull {
    floorplanID: number;
    bed: number;
    bath: number;
    sqft: number;
    deposit: number;
    photoUrl: string;
    washerDryer: string;
    price: number;
    priceMax: number;
    den: boolean;
    isAvailable: boolean;
    available: Date;
    comments: string;
}

export interface FloorPlan extends FloorplanLight, FloorplanFull {}

export interface Geocode {
    Longitude: string;
    Latitude: string;
    Percision: string;
    IsValid: boolean;
}


export interface Parking {
    propertyID: number;
    reserved: boolean;
    reservedFeeMin: number;
    reservedFeeMax: number;
    covered: boolean;
    coveredFeeMin: number;
    coveredFeeMax: number;
    garage: boolean;
    garageFeeMin: number;
    garageFeeMax: number;
    detached: boolean;
    detachedFeeMin: number;
    detachedFeeMax: number;
    breezeway: boolean;
    attached: boolean;
}

export interface SchoolsInfo {
    propertyID: number;
    district: string;
    elementry: string;
    intermediate: string;
    middle: string;
    high: string;
}

export interface PetInfo {
    allowed: boolean;
    extraRent: number;
    limit: number;
    weight: number;
    breedRestriction: boolean;
    nonRefundableFee: number;
}

export interface ApartmentFull {
    listID: number;
    propertyID: number;
    yearBuilt: number;
    yearRenovated: number;
    name: string;
    streetAddress: string;
    neighborhood: string;
    phone: string;
    city: string;
    adminFee: number;
    appFee: number;
    url: string;
    favorite: boolean;
    notes: string;
    specials: string;
    parking: Parking;
    schoolsInfo: SchoolsInfo;
    petInfo: PetInfo;
    paidUtilities: string[];
    floorplans: FloorPlan[];
    highValueAmenities: string[];
    unitAmenities: string[];
    propertyAmenities: string[];
    geocode: Geocode;
    photos: string[];
    section8: boolean;
    studentHousting: boolean;
    seniorHousing: boolean;
    officeHours?: any;
    numUnits: number;
    email?: any;
    role: string;
    management?: any;
    managementOffices: any[];
    regionalName?: any;
    regionalPhone?: any;
    regionalEmail?: any;
    onsiteManager?: any;
}

export interface ApartmentLight {
    listID: number;
    order: number;
    propertyID: number;
    name: string;
    streetAddress: string;
    city: string;
    state: string;
    pets: boolean;
    washerDry: string;
    photo: string;
    favorite: boolean;
    highestSentCommissions: number;
    onsiteManager?: any;
    management?: any;
    proximity: number;
    section8: boolean;
    seniorHousing: boolean;
    studentHousting: boolean;
    floorplans: FloorPlan[];
    highValueAmenities: string[];
    paidUtilities: string[];
    geocode: Geocode;
}

export interface Apartment extends ApartmentLight, ApartmentFull{
    error?: string;
    marker?: CustomMarker;
}

export interface ApartmentsFilterTerm {
    bySearch?: string;
    byFavorite?: boolean;
    byPets?: boolean;
    byCity?: string;
    byStreet?: string;
}


export interface ApartmentsFilterCondition {
    type: string;
    term: FilterTerm;
    items: string[];
}

export enum FilterTerm  {
    BySearch = 'bySearch',
    ByFavorite = 'byFavorite',
    ByPets = 'byPets',
    ByCity = 'byCity',
    ByStreet = 'byStreet'
}
