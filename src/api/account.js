import { Api } from "./api.js";

class AccountApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/account${slug ? `/${slug}` : ""}`;
    }

    static async get(controller) {
        return await Api.get(AccountApi.getUrl(), true, controller);
    }

    static async recharge(amount, controller) {
        const url = `${AccountApi.getUrl("recharge")}?amount=${encodeURIComponent(amount)}`;
        return await Api.post(url, true, undefined, controller);
    }
    
    static async updateAlias(data, controller) {
        const url = `${AccountApi.getUrl("update-alias")}?alias=${encodeURIComponent(data.alias)}`;
        return await Api.put(url, true, undefined, controller);
    }

    static async verifyCVU(cvu, controller) {
        const url = `${AccountApi.getUrl("verify-cvu")}?cvu=${encodeURIComponent(cvu)}`;
        return await Api.get(url, true, controller);
    }

    static async verifyAlias(alias, controller) {
        const url = `${AccountApi.getUrl("verify-alias")}?alias=${encodeURIComponent(alias)}`;
        return await Api.get(url, true, controller);
    }

}

export {AccountApi};