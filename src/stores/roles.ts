import { defineStore } from "pinia";
import type {
  ClientRole,
  RealmRole,
} from "src/pages/user-management/role/config/types";
export const useRoleStore = defineStore("roles", {
  state: () => ({
    client_roles: [] as ClientRole[],
    realm_roles: [] as RealmRole[],
  }),

  actions: {
    setClientRoles(client_roles: ClientRole[]) {
      this.client_roles = client_roles;
    },
    setRealmRoles(realm_roles: RealmRole[]) {
      this.realm_roles = realm_roles;
    },
  },
});
