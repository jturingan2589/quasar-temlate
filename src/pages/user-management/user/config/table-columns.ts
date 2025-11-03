import type { QTableColumn } from "quasar";
export const userListColumn: QTableColumn[] = [
  {
    name: "username",
    label: "Username",
    field: "username",
    align: "left" as const,
    sortable: true,
  },
  {
    name: "firstName",
    label: "First Name",
    field: "firstName",
    align: "left" as const,
    sortable: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    field: "lastName",
    align: "left" as const,
    sortable: true,
  },
  {
    name: "email",
    label: "Email",
    field: "email",
    align: "left" as const,
    sortable: true,
  },
  {
    name: "mobileNumber",
    label: "Mobile Number",
    field: (row) => row.attributes?.mobile_number?.[0] ?? "",
    align: "left" as const,
  },
  {
    name: "enabled",
    label: "Status",
    field: (row) => (row.enabled ? "Active" : "Disabled"),
    align: "center" as const,
  },
];
