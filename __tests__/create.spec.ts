import Taxcloud from '../src/main';
import { API_KEY, LOGIN_ID } from '../src/utils/config';
import { TaxcloudEnums } from '../src/utils/enums'
import { TaxcloudTypes } from '../src/utils/types';

describe('createLookup method success', () => {

  let results: TaxcloudTypes.Lookup;

  beforeAll(async () => {

    const taxcloud = new Taxcloud(
      {
        apiKey:API_KEY,
        loginId:LOGIN_ID
      });
    const cart: TaxcloudTypes.Cart = {
      deliveredBySeller: false,
      currencyType:'USD',
      origin: {
          address1: '15122 Culebra Rd',
          city: 'San Antonio',
          state: 'TX',
          zip5: 78253,
          zip4: 4614,
          country: 'US'
      },
      destination: {
          address1: '218 Kreutzberg Rd',
          city: 'Boerne',
          state: 'TX',
          zip5: 78006,
          zip4: 7825
      },
      items: [
          {
              itemID: '242A',
              index:0,
              tic: 0,
              price: 35.4,
              quantity: 2
          },
          {
              itemID: '3241C',
              index:1,
              tic: 11010,
              price: 22.78,
              quantity: 1
          }
      ]
  };

    const p: Promise<TaxcloudTypes.Lookup> = taxcloud.createLookup(cart);
    try{
    results = await p;
    }catch(error){
      results = error;
    }
  });

  it('creates new lookup with self links', () => {
    expect(results.links.self).toBe(`{{base_url}}/lookups/{{lookup_id}}`)
  })

  it('creates new lookup with data type lookup_detail', () => {
    expect(results.data.type).toBe(TaxcloudEnums.ReturnType.TRANSACTION_DETAIL);
  });

  it('creates new lookup with authorized set as null', () => {
    expect(results.data.attributes.authorized).toBeNull();
  });

  it('creates new lookup with captured set as null', () => {
    expect(results.data.attributes.captured).toBeNull();
  });

  it('creates new lookup with two items', () => {
    expect(results.data.attributes.items.length).toEqual(2);
  });

  it('creates new lookup with first item of type lookup_item', () => {
    expect(results.data.attributes.items[0].type).toBe(TaxcloudEnums.ReturnType.ITEM_DETAIL);
  });
});
