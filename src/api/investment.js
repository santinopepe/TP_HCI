import { Api } from "./api.js";

class InvestmentApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/investment${slug ? `/${slug}` : ""}`;
    }

    static async getDailyRate(controller) {
        return await Api.get(`${Api.baseUrl}/investment/daily-rate`, true, controller);
    }

    static async invest(data, controller) {
        const url = InvestmentApi.getUrl(`invest?amount=${data.amount}`);
        return await Api.post(url, true, data, controller);
    }

    static async divest(data, controller) {
        return await Api.post(InvestmentApi.getUrl("divest"), true, data, controller);
    }

    static async getDailyReturns(controller) {
        return await Api.get(InvestmentApi.getUrl("daily-returns"), true, controller);
    }

    static async getAll(controller) {
        return await Api.get(InvestmentApi.getUrl(), true, controller);
    }

    static async get(id, controller) {
        return await Api.get(InvestmentApi.getUrl(id), true, controller);
    }
}

class Investment {
    constructor(id, assetName, assetType, quantity, unitPrice, acquisitionDate) {
        if (id) {
            this.id = id;
        }
        this.assetName = assetName;
        this.assetType = assetType;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.acquisitionDate = acquisitionDate;
    }
    toString() {
        return JSON.stringify(this, null, 2);
    }
}

export { InvestmentApi, Investment }