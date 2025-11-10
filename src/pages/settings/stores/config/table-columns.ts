import type { QTableColumn } from "quasar";

export const storeColumns: QTableColumn[] = [
  {
    name: "entity_code",
    label: "Entity Code",
    field: "entity_code",
    align: "left",
    sortable: true,
  },
  {
    name: "store_code",
    label: "Store Code",
    field: "store_code",
    align: "left",
    sortable: true,
  },
  {
    name: "address",
    label: "Address",
    field: "address",
    align: "left",
    sortable: true,
  },
  {
    name: "owner",
    label: "Owner",
    field: "owner",
    align: "left",
    sortable: true,
  },
  {
    name: "status",
    label: "Status",
    field: "status",
    align: "center",
    sortable: true,
  },
];
