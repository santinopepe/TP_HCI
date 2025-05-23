import { Api } from "./api.js";

class ContactsApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/contacts${slug ? `/${slug}` : ""}`;
    }

    static async add(contact, controller) {
        return await Api.post(ContactsApi.getUrl(), true, contact, controller);
    }

    static async modify(contact, controller) {
        return await Api.put(ContactsApi.getUrl(contact.id), true, contact, controller);
    }

    static async remove(id, controller) {
        return await Api.delete(ContactsApi.getUrl(id), true, controller);
    }

    static async get(id, controller) {
        return await Api.get(ContactsApi.getUrl(id), true, controller);
    }

    static async getAll(controller) {
        return await Api.get(ContactsApi.getUrl(), true, controller);
    }
}

class Contact {
    constructor(id, name, alias, cvu) {
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.alias = alias;
        this.cvu = cvu;
    }
    toString() {
        return JSON.stringify(this, null, 2);
    }
}

export { ContactsApi, Contact }