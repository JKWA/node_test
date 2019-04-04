import Taxcloud from '../src/main';
import { API_KEY, LOGIN_ID } from '../src/utils/config';
import { TaxcloudEnums } from '../src/utils/enums';
import { TaxcloudTypes } from '../src/utils/types';

describe('createLookup method success', () => {
  let results: TaxcloudTypes.Lookup;

  beforeAll(async () => {
    const taxcloud = new Taxcloud({
      apiKey: API_KEY,
      loginId: LOGIN_ID,
    });

    const p: Promise<TaxcloudTypes.Lookup> = taxcloud.captured(
      'test_order_id',
      { captured: '2019-03-20T10:34:33' },
    );
    results = await p;
  });

  it('creates new order with self links', () => {
    expect(results.links.self).toBe(`{{base_url}}/orders/{{order_id}}`);
  });

  it('creates new order with data type order_detail', () => {
    expect(results.data.type).toBe(TaxcloudEnums.ReturnType.TRANSACTION_DETAIL);
  });

  it('creates new order with authorized not set as null', () => {
    expect(results.data.attributes.authorized).not.toBeNull();
  });

  it('creates new order with captured not set as null', () => {
    expect(results.data.attributes.captured).not.toBeNull();
  });
});

describe('createLookup method failure', () => {
  let results: TaxcloudTypes.Lookup;

  beforeAll(async () => {
    const taxcloud = new Taxcloud({
      apiKey: API_KEY,
      loginId: LOGIN_ID,
    });

    const p: Promise<TaxcloudTypes.Lookup> = taxcloud.authorizedLookup(
      undefined,
      { orderId: 'merchant_order_id' },
    );

    try {
      results = await p;
    } catch (err) {
      results = err;
    }
  });

  it('incorrect login id results with 404 error', () => {
    expect(results).toEqual(new Error('Must include valid lookup id'));
  });
});

describe('createLookup method failure', () => {
  let results: TaxcloudTypes.Lookup;

  beforeAll(async () => {
    const taxcloud = new Taxcloud({
      apiKey: API_KEY,
      loginId: LOGIN_ID,
    });

    const p: Promise<TaxcloudTypes.Lookup> = taxcloud.authorizedLookup(
      'wrong_id',
      { orderId: 'merchant_order_id' },
    );

    try {
      results = await p;
    } catch (err) {
      results = err;
    }
  });

  it('incorrect login id results with 404 error', () => {
    expect(results).toEqual(new Error('Request failed with status code 404'));
  });
});
