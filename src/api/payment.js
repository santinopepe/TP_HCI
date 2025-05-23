import { Api } from "./api.js";

class PaymentApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/payment${slug ? `/${slug}` : ""}`;
    }

    // Realizar un pago
    static async pay(payment, controller) {
        return await Api.post(PaymentApi.getUrl(), true, payment, controller);
    }

    // Obtener pagos realizados (opcional)
    static async getAll(controller) {
        return await Api.get(PaymentApi.getUrl(), true, controller);
    }

    // Obtener un pago por id (opcional)
    static async get(id, controller) {
        return await Api.get(PaymentApi.getUrl(id), true, controller);
    }
}

// Clase para representar un pago
class Payment {
    constructor({ amount, method, cardId, accountId, to, description }) {
        this.amount = amount; // Monto a pagar
        this.method = method; // 'card' o 'account'
        this.cardId = cardId; // Si es con tarjeta
        this.accountId = accountId; // Si es con cuenta
        this.to = to; // destinatario (puede ser contacto, comercio, etc)
        this.description = description; // opcional
    }
}

export { PaymentApi, Payment }