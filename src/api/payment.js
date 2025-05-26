import { Api } from "./api.js";

class PaymentApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/payment${slug ? `/${slug}` : ""}`;
    }

    // Realizar un pago
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
            // Mandar el objeto de pago como body
            return await Api.put(url, true,  controller);
        } catch (error) {
            console.error("Error in PaymentApi.put:", error.response?.data || error.message);
            throw error;
        }
    }

    // Obtener pagos realizados (opcional)
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
    static async transferByEmail(data, controller) {
    return await Api.post(PaymentApi.getUrl("transfer-email"), true, data, controller);
    }
    static async transferByCVU(params, body, controller) {
    const url = `${PaymentApi.getUrl("transfer-cvu")}${params}`;
    return await Api.post(url, true, body, controller);
    }
    static async transferByAlias(data, controller) {
    return await Api.post(PaymentApi.getUrl("transfer-alias"), true, data, controller);
    }
    
}


// Clase para representar un pago
class Payment {
    constructor({id,description,amount,pending,uuid,method, payer, receiver, card, metadata}) {
        if (id) {
            this.id = id;
        }
        this.description = description;
        this.amount = amount;
        this.pending = pending;
        this.uuid = uuid;
        this.method = method; // "ACCOUNT" o "CARD"
        this.payer = payer; // { id, firstName, lastName }
        this.receiver = receiver; // { id, firstName, lastName }
        this.card = card; // { id, number }
        this.metadata = metadata || {};
    }
}

export { PaymentApi, Payment }