export namespace TaxcloudTypes {
  export interface IConfig {
    apiKey: string;
    loginId: string;
  }

  export interface AxiosConfig {
    baseURL: string;
    headers: object;
    timeout: number;
  }

  export interface Address {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zip5: number;
    zip4?: number;
    country?: string;
  }

  interface CartItem {
    itemID: string;
    index: number;
    tic: number;
    price: number;
    quantity: number;
  }

  export interface Cart {
    currencyType: string;
    deliveredBySeller: boolean;
    destination: Address;
    origin: Address;
    items: CartItem[];
  }

  interface Links {
    self: string;
    authorized: string;
    authorized_with_captured: string;
  }

  interface LookupItem {
    id: string;
    // tslint:disable-next-line:no-reserved-keywords
    type: string;
    attributes: object;
  }

  interface LookupAttributes {
    authorized: string;
    captured: string;
    returned: string;
    currencyType: string;
    deliveredBySeller: boolean;
    totalSales: number;
    totalTax: number;
    total: number;
    distination: Address;
    origin: Address;
    items: LookupItem[];
  }

  interface LookupData {
    id: string;
    // tslint:disable-next-line:no-reserved-keywords
    type: string;
    attributes: LookupAttributes;
  }

  export interface Lookup {
    links: Links;
    meta: object;
    data: LookupData;
    relationships: object;
  }

  export interface Authorized {
    authorized?: string;
    orderId: string;
  }

  export interface Captured {
    captured?: string;
  }

  export interface Returned {
    returned?: string;
  }
}
