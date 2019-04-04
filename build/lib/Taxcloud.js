"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const config_1 = require("./utils/config");
class Taxcloud {
    constructor(config) {
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
            baseURL: config_1.BASE_URL,
            timeout: 2000,
            headers: {
                'X-Api-Key': config.apiKey,
                'Content-Type': 'application/json',
                'X-Api-LoginID': config.loginId,
            },
        };
    }
    createLookup(cart) {
        const instance = axios_1.default.create(this.axiosConfig);
        return instance
            .post(`/lookups`, cart)
            .then((response) => {
            return response.data;
        })
            .catch((error) => {
            return error;
        });
    }
    authorizedLookup(lookupId, authorized) {
        const instance = axios_1.default.create(Object.assign({}, this.axiosConfig, { params: { return: 'representation' } }));
        return instance
            .post(`lookup/${lookupId}/authorized`, authorized)
            .then((response) => {
            return response.data;
        })
            .catch((error) => {
            return error;
        });
    }
}
Taxcloud.BASE_URL = config_1.BASE_URL;
Taxcloud.VERSION = 'v2';
exports.Taxcloud = Taxcloud;
//# sourceMappingURL=Taxcloud.js.map