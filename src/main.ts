// tslint:disable-next-line: match-default-export-name
import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from './utils/config';
import { TaxcloudTypes } from './utils/types';
// import { TaxcloudEnums } from './utils/enums';

// tslint:disable-next-line: completed-docs
export class Taxcloud {
  public static BASE_URL: string = BASE_URL;
  public static VERSION: string = 'v2';
  private readonly axiosConfig: TaxcloudTypes.AxiosConfig;

  constructor(config: TaxcloudTypes.IConfig) {
    if (config === null) {
      throw new Error('null config error');
    }
    if (config.apiKey === null) {
      throw new Error('missing api key error');
    }
    if (config.loginId === null) {
      throw new Error('missing login id error');
    }

    this.axiosConfig = {
      baseURL: BASE_URL,
      timeout: 2000,
      headers: {
        'X-Api-Key': config.apiKey,
        'Content-Type': 'application/json',
        'X-Api-LoginID': config.loginId,
      },
    };
  }

  public createLookup(cart: TaxcloudTypes.Cart): Promise<TaxcloudTypes.Lookup> {
    const instance = axios.create(this.axiosConfig);

    if (cart === undefined) {
      return Promise.reject(
        new Error('Create lookup must contain a cart object'),
      );
    }

    return instance.post(`/lookups`, cart).then((response: AxiosResponse) => {
      return response.data;
    });
  }

  public authorizedLookup(
    lookupId: string,
    params: TaxcloudTypes.Authorized = { orderId: undefined },
  ): Promise<TaxcloudTypes.Lookup> {
    if (lookupId === undefined) {
      return Promise.reject(new Error('Must include valid lookup id'));
    }

    if (params.orderId === undefined) {
      return Promise.reject(
        new Error('Must include params object with valid orderId'),
      );
    }

    const instance = axios.create({
      ...this.axiosConfig,
      params: { return: 'representation' },
    });

    return instance
      .post(`lookup/${lookupId}/authorized`, params)
// tslint:disable-next-line: no-unsafe-any
      .then((response: AxiosResponse): TaxcloudTypes.Lookup => response.data);
  }

  public captured(
    orderId: string,
    params: TaxcloudTypes.Captured,
  ): Promise<TaxcloudTypes.Lookup> {
    if (orderId === undefined) {
      return Promise.reject(new Error('Must include valid order id'));
    }

    const instance = axios.create({
      ...this.axiosConfig,
      params: { return: 'representation' },
    });

    return instance
      .post(`orders/${orderId}/captured`, params)
      .then((response: AxiosResponse) => {
        return response.data;
      });
  }

  public authorizedWithCapture(
    lookupId: string,
    params: TaxcloudTypes.Authorized & TaxcloudTypes.Captured = {
      orderId: undefined,
    },
  ): Promise<TaxcloudTypes.Lookup> {
    if (lookupId === undefined) {
      return Promise.reject(new Error('Must include valid order id'));
    }

    if (params.orderId === undefined) {
      return Promise.reject(
        new Error('Must include authorized array with valid orderId'),
      );
    }

    const instance = axios.create({
      ...this.axiosConfig,
      params: { return: 'representation' },
    });

    return instance
      .post(`lookups/${lookupId}/authorizedWithCapture`, params)
// tslint:disable-next-line: no-unsafe-any
      .then((response: AxiosResponse) => response.data);
  }

  public returnedEntireOrder(
    orderId: string,
    params: TaxcloudTypes.Returned = {},
  ): Promise<TaxcloudTypes.Lookup> {
    if (orderId === undefined) {
      return Promise.reject(new Error('Must include valid order id'));
    }

    const instance = axios.create({
      ...this.axiosConfig,
      params: { return: 'representation' },
    });

    return instance
      .post(`lookups/${orderId}/returned`, params)
// tslint:disable-next-line: no-unsafe-any
      .then((response: AxiosResponse) => response.data);
  }
}
