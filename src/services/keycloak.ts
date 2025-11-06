// src/services/kcApiService.ts
import { useAuthStore } from "src/stores/auth";

const authStore = useAuthStore();

const getHeaders = async () => {
  const kc = authStore.keycloak;
  if (!kc) throw new Error("Keycloak not initialized");

  // 🔄 Refresh token if near expiry (<30s)
  await kc.updateToken(30).catch(() => kc.login());

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${kc.token}`,
  };
};

const baseUrl = `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${import.meta.env.VITE_KEYCLOAK_REALM}`;
export const kcApiService = {
  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const headers = await getHeaders();
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    const response = await fetch(baseUrl + url + query, { headers });

    if (!response.ok) throw new Error(await response.text());
    return await response.json();
  },

  async post<T>(url: string, body: any): Promise<T | { id?: string }> {
    const headers = await getHeaders();
    const response = await fetch(baseUrl + url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error(await response.text());

    // ✅ Handle Location header for Keycloak-created resources
    const location = response.headers.get("Location");
    if (location) {
      const idMatch = location.match(/\/([^/]+)$/);
      if (idMatch && idMatch[1]) {
        return { id: idMatch[1] as string };
      }
    }

    // ✅ Try JSON body (handles endpoints that return JSON)
    return await response.json().catch(() => ({}) as T);
  },

  async put<T>(url: string, body: any): Promise<T> {
    const headers = await getHeaders();
    const response = await fetch(baseUrl + url, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error(await response.text());
    return await response.json().catch(() => ({}));
  },

  async delete<T>(url: string): Promise<T> {
    const headers = await getHeaders();
    const response = await fetch(baseUrl + url, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) throw new Error(await response.text());
    return await response.json().catch(() => ({}));
  },
};
