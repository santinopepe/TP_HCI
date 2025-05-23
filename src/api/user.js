import { Api } from "./api.js";

export { UserApi, Credentials, User }

class UserApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/user${ slug ? `/${slug}` : ""}`;
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
        return await Api.post(UserApi.getUrl("register"), false, user, controller);
    }
}

class Credentials {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}

class User {
    constructor(name, email, dni, phone) {
        this.name = name;
        this.email = email;
        this.dni = dni;
        this.phone = phone;
    }
}