import { ref, computed } from "vue"
import { defineStore } from "pinia";
import { UserApi } from "../../api/user.js";
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
    // user es una instancia de User
    return await UserApi.register(user);
    }

    return { user, isLoggedIn, initialize, login, logout, getCurrentUser, register };
});