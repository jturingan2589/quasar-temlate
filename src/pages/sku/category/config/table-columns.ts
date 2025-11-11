import { QTableColumn } from "quasar";

export const categoryListColumns: QTableColumn[] = [
  {
    name: "category_name",
    field: "category_name",
    label: "Category",
    sortable: true,
  },
  {
    name: "code",
    field: "code",
    label: "Category Code",
    sortable: true,
  },
];
