import { Api } from "./api.js";

export { UserApi, Credentials, User };

class UserApi {
  static getUrl(slug) {
    return `${Api.baseUrl}/user${slug ? `/${slug}` : ""}`;
  }

  static async login(credentials, controller) {
    return await Api.post(
      UserApi.getUrl("login"),
      false,
      credentials,
      controller
    );
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
      signal: controller?.signal,
    });
    const data = await response.json();
    if (!response.ok) {
      const error = new Error(data.message || "Error");
      error.response = { data };
      throw error;
    }
    return data;
  }
  static async verify({ email, code }, controller) {
    const url = UserApi.getUrl(`verify?code=${encodeURIComponent(code)}`);
    return await Api.post(url, false, { email }, controller);
  }

  static async resetPassword(email, controller) {
    const url = UserApi.getUrl(
      `reset-password?email=${encodeURIComponent(email)}`
    );
    return await Api.post(url, true, {}, controller);
  }

  static async changePassword({ code, password }, controller) {
    return await Api.post(
      UserApi.getUrl("change-password"),
      true,
      { code, password },
      controller
    );
  }

  static async resendVerification({ email }, controller) {
    const url = `${Api.baseUrl}/user/resend-verification?email=${encodeURIComponent(email)}`;
    return await Api.post(url, false, {}, controller);
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
