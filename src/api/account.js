import { Api } from "./api.js";

class AccountApi {
    static getUrl(slug) {
        // Si hay slug, lo agrega, si no, solo /account
        return `${Api.baseUrl}/account${slug ? `/${slug}` : ""}`;
    }

    static async get(controller) {
        // GET /api/account
        return await Api.get(AccountApi.getUrl(), true, controller);
    }

    static async recharge(data, controller) {
        // POST /api/account/recharge
        return await Api.post(AccountApi.getUrl("recharge"), true, data, controller);
    }
    
    static async updateAlias(data, controller) {
        // El alias va como parámetro de query, no en el body
        const url = `${AccountApi.getUrl("update-alias")}?alias=${encodeURIComponent(data.alias)}`;
        return await Api.put(url, true, undefined, controller);
    }

    static async verifyCVU(cvu, controller) {
        // GET /api/account/verify-cvu?cvu=...
        const url = `${AccountApi.getUrl("verify-cvu")}?cvu=${encodeURIComponent(cvu)}`;
        return await Api.get(url, true, controller);
    }

    static async verifyAlias(alias, controller) {
        // GET /api/account/verify-alias?alias=...
        const url = `${AccountApi.getUrl("verify-alias")}?alias=${encodeURIComponent(alias)}`;
        return await Api.get(url, true, controller);
    }

}


export {AccountApi};