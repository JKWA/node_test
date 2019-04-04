// import { TaxcloudTypes } from '../src/Models/types';
import  Taxcloud from '../src/main';
import { API_KEY, LOGIN_ID } from '../src/utils/config';

describe('taxcloud', () => {

  it('instantiate with IConfig expects true', () => {
    const taxcloud = new Taxcloud({apiKey:API_KEY, loginId:LOGIN_ID})
    expect(taxcloud).toBeTruthy();
  });

  it('instantiate missing api key throws error', () => {
    expect (() => new Taxcloud({apiKey:null, loginId: LOGIN_ID})).toThrow()
  });

  it('instantiate missing login id throws error', () => {
    expect (() => new Taxcloud({apiKey:API_KEY, loginId: null})).toThrow()
  })

});
