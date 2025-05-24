import { Api } from './api'

class CardApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/card${slug ? `/${slug}` : ''}`;
    }

    static async add(card, controller) {
        return await Api.post(CardApi.getUrl(), true, card, controller);
    }

    static async modify(card, controller) {
        return await Api.put(CardApi.getUrl(card.id), true, card, controller);
    }

    static async remove(id, controller) {
        return await Api.delete(CardApi.getUrl(id), true, controller);
    }

    static async get(id, controller) {
        return await Api.get(CardApi.getUrl(id), true, controller);
    }

    static async getAll(controller) {
        return await Api.get(CardApi.getUrl(), true, controller);
    }
}

class Card {
    constructor(id, fullName, cvv, number, expirationDate, type) {
        if (id) {
            this.id = id;
        }
        this.type = type; // puede ser debito o credito
        this.number = number; // los primeros numeros determinan si es visa, mastercard, etc
        this.expirationDate = expirationDate;
        this.fullName = fullName; // no creo que haga falta porq es el nombre del usuario
        this.cvv = cvv; // codigo de seguridad
        this.metadata = {};
    }
    toString() {
        return JSON.stringify(this, null, 2);
    }
}

export { CardApi, Card }