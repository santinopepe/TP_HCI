import { Api } from "./api.js";

export { UserApi, Credentials, User }

class UserApi {
    static getUrl(slug) {
        // Si hay slug, lo agrega, si no, solo /user
        return `${Api.baseUrl}/user${slug ? `/${slug}` : ""}`;
    }

    static async login(credentials, controller) {
        return await Api.post(UserApi.getUrl("login"), false, credentials, controller);
    }

    static async logout(controller) {
        await Api.post(UserApi.getUrl("logout"), true, controller);
    }

    static async get(controller) {
        return Api.get(UserApi.getUrl(), true, controller);
    }

    static async register(user, controller) {
        const response = await fetch(UserApi.getUrl(), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
            signal: controller?.signal
        });
        const data = await response.json();
        if (!response.ok) {
            // Lanza el error con el mismo formato que espera tu catch
            const error = new Error(data.message || "Error");
            error.response = { data };
            throw error;
        }
        return data;
    }

    static async verify(data, controller) {
        // data puede ser { email: ... } o { id: ... } según tu backend
        return await Api.post(UserApi.getUrl("verify"), false, data, controller);
    }

}

class Credentials {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}

class User {
    constructor(firstName, lastName, birthDate, email, password, metadata = {}) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.email = email;
        this.password = password;
        this.metadata = metadata;
    }
}