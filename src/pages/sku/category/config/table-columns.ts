import { QTableColumn } from "quasar";

export const categoryListColumns: QTableColumn[] = [
  { name: "category", field: "category", label: "Category", sortable: true },
  {
    name: "code",
    field: "code",
    label: "Category Code",
    sortable: true,
  },
  {
    name: "Created On",
    field: "created_on",
    label: "Created On",
    sortable: true,
  },
  {
    name: "Status",
    field: "status",
    label: "Status",
    sortable: true,
  },
];
