import { defineStore } from "pinia";
import { AccountApi } from "../../api/account.js";
import { UserApi } from "../../api/user.js";

export const usePerfilStore = defineStore("perfil", () => {
    
    async function getProfile() {
        const result = await AccountApi.get();
        return result;
    }

    async function resetPassword(email) {
        const result = await UserApi.resetPassword(email);
        return result;
    }

    async function changePassword({ code, password }) {
        const result = await UserApi.changePassword({ code, password });
        return result;
    }

    return { 
        getProfile, 
        resetPassword, 
        changePassword 
    };
}); 