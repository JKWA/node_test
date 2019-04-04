"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
let path;
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
exports.APP_ID = process.env.APP_ID;
exports.LOG_LEVEL = process.env.LOG_LEVEL;
exports.API_KEY = process.env.API_KEY;
exports.LOGIN_ID = process.env.LOGIN_ID;
exports.BASE_URL = process.env.BASE_URL;
//# sourceMappingURL=config.js.map