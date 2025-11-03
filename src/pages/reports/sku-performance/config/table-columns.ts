import { QTableColumn } from "quasar";

const quantityColumns: QTableColumn[] = [
  {
    name: "sku",
    label: "Product Code",
    field: "sku",
    align: "left",
    sortable: true,
  },
  {
    name: "name",
    label: "Product Name",
    field: "name",
    align: "left",
    sortable: true,
  },
  {
    name: "quantity",
    label: "Quantity Sold",
    field: "quantity",
    align: "right",
    sortable: true,
  },

  {
    name: "receipts",
    label: "Receipts Appeared In",
    field: "receipts",
    align: "center",
    sortable: true,
  },
  {
    name: "percent",
    label: "% of Transactions",
    field: "percent",
    align: "right",
    format: (val: string) => `${val}%`,
  },
];

const gmvColumns: QTableColumn[] = [
  {
    name: "sku",
    label: "Product Code",
    field: "sku",
    align: "left",
    sortable: true,
  },
  {
    name: "name",
    label: "Product Name",
    field: "name",
    align: "left",
    sortable: true,
  },
  {
    name: "gmv",
    label: "Total Sales (GMV)",
    field: "gmv",
    align: "right",
    sortable: true,
    format: (val: string) => `₱${val.toLocaleString()}`,
  },

  {
    name: "receipts",
    label: "Receipts Appeared In",
    field: "receipts",
    align: "center",
    sortable: true,
  },
  {
    name: "percent",
    label: "% of Transactions",
    field: "percent",
    align: "right",
    format: (val: string) => `${val}%`,
  },
];

export { quantityColumns, gmvColumns };
