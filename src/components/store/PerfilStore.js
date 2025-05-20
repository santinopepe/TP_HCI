import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePerfilStore = defineStore('perfil', () => {
  // State
  const user = ref({
    cvu: "0023481928201930457639",
    name: "Juliana Márquez",
    accountNumber: "44.887.744",
    email: "jmarquez01@gmail.com",
    phone: "+54 9 11 5325-6201",
    alias: "jmarquez01",
    gender: "Mujer",
  });

  const profileImage = ref("/images/mujer.png"); // Initial profile image

  // Actions
  function setProfileImage(newImageBase64) {
    profileImage.value = newImageBase64;
  }

  // You can also add actions to update other user details if needed in the future
  function updateUserName(newName) {
    user.value.name = newName;
  }

  function updateUserEmail(newEmail) {
    user.value.email = newEmail;
  }

  return {
    user,
    profileImage,
    setProfileImage,
    updateUserName,
    updateUserEmail,
  };
});