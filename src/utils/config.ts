import * as dotenv from 'dotenv';

let path: string;

switch (process.env.NODE_ENV) {
  case 'test':
    path = `${__dirname}/../../.env.postman`;
    break;
  case 'production':
    path = `${__dirname}/../../.env.production`;
    break;
  default:
    path = `${__dirname}/../../.env.development`;
}
dotenv.config({ path: path });

export const APP_ID = process.env.APP_ID;
export const LOG_LEVEL = process.env.LOG_LEVEL;
export const API_KEY = process.env.API_KEY;
export const LOGIN_ID = process.env.LOGIN_ID;
export const BASE_URL = process.env.BASE_URL;
