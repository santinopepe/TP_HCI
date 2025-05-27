import { ref, computed } from "vue"
import { defineStore } from "pinia";
import { UserApi, Credentials, User } from "../../api/user.js";
import { Api } from "../../api/api.js";

const SECURITY_TOKEN_KEY = "security-token";

export const useSecurityStore = defineStore("security", () => {
    const token = ref(null);
    const user = ref(null);

    const isLoggedIn = computed(() => {
        return token.value != null;
    });

    function initialize() {
        const token = localStorage.getItem(SECURITY_TOKEN_KEY);
        if (token) setToken(token);
    }

    function setUser(value) {
        user.value = value;
    }

    function setToken(value) {
        token.value = value;
        Api.token = value;
    }

    function updateToken(value, rememberMe) {
        if (rememberMe) localStorage.setItem(SECURITY_TOKEN_KEY, token);
        setToken(value);
    }

    function removeToken() {
        localStorage.removeItem(SECURITY_TOKEN_KEY);
        setToken(null);
        setUser(null);
    }

    function putCredentials(email, password ) {
        return new Credentials(email, password);
    }

    function createUser(firstName, lastName, birthDate, email, password, dni, phone) {
        return new User(firstName, lastName, birthDate, email, password, {dni: dni, phone: phone});
    }

    async function verify( email, code ) {
        const response = await UserApi.verify({ email, code });
        if (response.error) {
            throw new Error(response.error);
        }
        return response;
    }

    async function login(credentials, rememberMe) {
        const result = await UserApi.login(credentials);
        updateToken(result.token, rememberMe);
    }

    async function logout() {
        try {
            await UserApi.logout();
        } finally {
            removeToken();
        }
    }

    async function getCurrentUser() {
        if (user.value) return user.value;
        const result = await UserApi.get();
        setUser(result);
        return result;
    }

    async function register(user) {
    return await UserApi.register(user);
    }

    async function resetPassword(emailOrDni) {
        return await UserApi.resetPassword(emailOrDni);
    }

    async function changePassword({ code, password }) {
        return await UserApi.changePassword({ code, password });
    }

    return { user, isLoggedIn, initialize, login, logout, getCurrentUser, register, resetPassword, changePassword, putCredentials, createUser, verify };
});