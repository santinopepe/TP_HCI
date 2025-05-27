import { Api } from "./api.js";

class PaymentApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/payment${slug ? `/${slug}` : ""}`;
    }

    static async pay({ cardId, cvu, ...body }, controller) {
        const url = `${PaymentApi.getUrl()}?cardId=${encodeURIComponent(cardId)}&cvu=${encodeURIComponent(cvu)}`;
        return await Api.post(url, true, body, controller);
    }

    static async put(payment, controller) {
        const { id, uuid, amount, method, cardId, cvu } = payment;
        let query = `?uuid=${uuid}`;
        if (method === "CARD" && cardId) {
            query += `&cardId=${cardId}`;
        }
        const url = `${PaymentApi.getUrl("push")}${query}`;
        try {
            return await Api.put(url, true, payment, controller);
        } catch (error) {
            console.error("Error in PaymentApi.put:", error.response?.data || error.message);
            throw error;
        }
    }

    static async getAll(controller) {
        return await Api.get(PaymentApi.getUrl(), true, controller);
    }

    static async get(id, controller) {
        return await Api.get(PaymentApi.getUrl(id), true, controller);
    }

    static async pull(payment, controller) {
        return await Api.post(PaymentApi.getUrl("pull"), true, payment, controller);
    }

    static async push(payment, controller) {
        return await Api.put(PaymentApi.getUrl("push"), true, payment, controller);
    }

    static async transferByEmail(params, body, controller) {
        const url = `${PaymentApi.getUrl("transfer-email")}${params}`;
        const updatedBody = {
            ...body,
            metadata: {
                ...body.metadata,
                transferDate: new Date().toISOString()
            }
        };
        return await Api.post(url, true, updatedBody, controller);
    }

    static async transferByCVU(params, body, controller) {
        const url = `${PaymentApi.getUrl("transfer-cvu")}${params}`;
        const updatedBody = {
            ...body,
            metadata: {
                ...body.metadata,
                transferDate: new Date().toISOString()
            }
        };
        return await Api.post(url, true, updatedBody, controller);
    }

    static async transferByAlias(params, body, controller) {
        const url = `${PaymentApi.getUrl("transfer-alias")}${params}`;
        const updatedBody = {
            ...body,
            metadata: {
                ...body.metadata,
                transferDate: new Date().toISOString()
            }
        };
        return await Api.post(url, true, updatedBody, controller);
    }
}

class Payment {
    constructor({ id, description, amount, pending, uuid, method, payer, receiver, card, metadata }) {
        if (id) {
            this.id = id;
        }
        this.description = description;
        this.amount = amount;
        this.pending = pending;
        this.uuid = uuid;
        this.method = method;
        this.payer = payer;
        this.receiver = receiver;
        this.card = card;
        this.metadata = metadata || { transferDate: new Date().toISOString() }; 
    }
}

export { PaymentApi, Payment };