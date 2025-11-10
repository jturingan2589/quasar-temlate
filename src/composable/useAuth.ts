import { ref } from "vue";

export const clientRoles = ref<string[]>([]);

export function setClientRoles(token: any, clientId: string) {
  const roles = token?.resource_access?.[clientId]?.roles || [];
  const admin_roles = token?.resource_access?.["realm-management"]?.roles || [];
  clientRoles.value = [...roles, ...admin_roles];
}

export function hasPermission(role: string) {
  return clientRoles.value.includes(role);
}

export function hasAnyClientRole(roles: string[]) {
  return roles.some((r) => hasPermission(r));
}
