import { QTableColumn } from "quasar";
export const rolePermissionsColumn: QTableColumn[] = [
  {
    name: "name",
    label: "Role",
    field: "name",
    sortable: true,
    align: "left",
  },
  {
    name: "description",
    label: "Description",
    field: "description",
    sortable: true,
    align: "left",
  },
  {
    name: "action",
    label: "",
    field: "action",
    sortable: false,
    align: "center",
  },
];
