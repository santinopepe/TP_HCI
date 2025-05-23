import { Api } from "./api.js";

class InvestmentApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/investment${slug ? `/${slug}` : ""}`;
    }

    static async add(investment, controller) {
        return await Api.post(InvestmentApi.getUrl(), true, investment, controller);
    }

    static async modify(investment, controller) {
        return await Api.put(InvestmentApi.getUrl(investment.id), true, investment, controller);
    }

    static async remove(id, controller) {
        return await Api.delete(InvestmentApi.getUrl(id), true, controller);
    }

    static async get(id, controller) {
        return await Api.get(InvestmentApi.getUrl(id), true, controller);
    }

    static async getAll(controller) {
        return await Api.get(InvestmentApi.getUrl(), true, controller);
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