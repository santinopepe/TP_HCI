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

    static async put(payment) {
        // Destructure the properties from the 'payment' object
        const { id, uuid, amount, method, cardId, cvu } = payment;

        // 1. Construct the query parameters
        // 'query' must be defined *before* it's used in the console.log or url
        let query = `?uuid=${uuid}`;
        if (method === "CARD" && cardId) {
            query += `&cardId=${cardId}`;
        }
        
        // 3. Define the full URL with the correct endpoint and query parameters
        const url = `/api/payment/push${query}`;

        console.log("Payment API push (PUT) Request URL:", url);
        console.log("Payment API push (PUT) Request Payload:", payload);

        try {
            // Make the PUT request
            return await Api.put(url, NULL).then((res) => res.data);
        } catch (error) {
            // Log the error response from the API for better debugging
            console.error("Error in PaymentApi.put:", error.response?.data || error.message);
            throw error; // Re-throw the error so it can be handled by the calling store
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