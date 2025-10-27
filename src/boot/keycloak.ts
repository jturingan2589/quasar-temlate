import { boot } from "quasar/wrappers";
import Keycloak, { type KeycloakInstance } from "keycloak-js";
import { useAuthStore } from "src/stores/auth";
import type {
  Router,
  RouteLocationNormalized,
  NavigationGuardNext,
} from "vue-router";
import { Loading } from "quasar";

let keycloak: KeycloakInstance | null = null;
let initialized = false;

/**
 * Singleton getter for Keycloak instance
 */
export function getKeycloakInstance(): KeycloakInstance {
  if (!keycloak) {
    keycloak = new Keycloak({
      url: import.meta.env.VITE_KEYCLOAK_URL,
      realm: import.meta.env.VITE_KEYCLOAK_REALM,
      clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
    });
  }
  return keycloak;
}

/**
 * Initialize Keycloak only once
 */
export async function initKeycloak(router: Router): Promise<boolean> {
  const authStore = useAuthStore();
  const kc = getKeycloakInstance();

  // 🧩 Avoid re-initialization (useful for retries or hot reload)
  if (initialized && kc.authenticated) {
    return true;
  }

  try {
    const authenticated = await kc.init({
      onLoad: "check-sso",
      checkLoginIframe: false,
      pkceMethod: "S256",
      silentCheckSsoRedirectUri: `${window.location.origin}/app/silent-check-sso.html`,
      redirectUri: `${window.location.origin}/app/`,
      enableLogging: true,
    });

    initialized = true;

    if (authenticated) {
      authStore.setKeycloak(kc);

      // 🕒 Handle token refresh
      kc.onTokenExpired = async () => {
        Loading.show({
          message: "Refreshing session...",
          spinnerColor: "primary",
        });
        try {
          const refreshed = await kc.updateToken(70);
          if (refreshed) authStore.setKeycloak(kc);
        } catch (err) {
          await router.push("/login");
        } finally {
          Loading.hide();
        }
      };
    } else {
      await router.push("/unauthorized");
    }

    return authenticated;
  } catch (err) {
    return false;
  }
}

/**
 * Boot file — sets up guards and initializes Keycloak
 */
export default boot(async ({ router }: { router: Router }) => {
  try {
    Loading.show({
      message: "Checking authentication...",
      spinnerColor: "primary",
      backgroundColor: "rgba(0, 0, 0, 0.94)",
    });

    const connected = await initKeycloak(router);

    if (!connected) {
      await router.push("/timeout?reason=keycloak-unreachable");
      Loading.hide();
      return;
    }

    // 🔒 Router Guard
    router.beforeEach(
      async (
        to: RouteLocationNormalized,
        _from: RouteLocationNormalized,
        next: NavigationGuardNext,
      ) => {
        Loading.show({ message: "Loading page...", spinnerColor: "primary" });

        if (["/login", "/unauthorized"].includes(to.path)) {
          Loading.hide();
          next();
          return;
        }

        if (to.path === "/app/auth/callback") {
          keycloak?.authenticated ? next("/main/dashboard") : next("/login");
          Loading.hide();
          return;
        }

        if (to.meta.requiresAuth) {
          if (!keycloak?.authenticated) {
            sessionStorage.setItem("intendedRoute", to.fullPath);
            await keycloak?.login({
              redirectUri: `${window.location.origin}/app/`,
            });
            return;
          }

          // 🛡️ Role check
          if (to.meta.roles) {
            const roles = to.meta.roles as string[];
            const hasRole = roles.some((r) => keycloak?.hasRealmRole(r));
            if (!hasRole) {
              next("/unauthorized");
              Loading.hide();
              return;
            }
          }
        }

        Loading.hide();
        next();
      },
    );
  } catch (err) {
    await router.push("/timeout?reason=keycloak-timeout");
  } finally {
    Loading.hide();
  }
});

export { keycloak };
