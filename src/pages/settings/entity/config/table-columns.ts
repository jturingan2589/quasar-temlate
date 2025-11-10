import type { QTableColumn } from "quasar";
export const entityListColumn: QTableColumn[] = [
  {
    label: "Entity Code",
    field: "entity_code",
    name: "entity_code",
    sortable: true,
  },
  { label: "Name", field: "name", name: "name", sortable: true },
  {
    label: "Description",
    field: "description",
    name: "description",
    sortable: true,
  },
  { label: "Status", field: "status", name: "status", sortable: true },
];
