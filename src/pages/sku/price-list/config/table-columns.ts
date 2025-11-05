import type { QTableColumn } from "quasar";
import { formatValue } from "src/utils/formatter";

export const priceListColumns: QTableColumn[] = [
  {
    name: "store_name",
    label: "Store Name",
    field: "store_name",
    align: "left" as const,
    sortable: true,
  },
  {
    name: "branch",
    label: "Branch / Location",
    field: "branch",
    align: "left" as const,
    sortable: true,
  },
  {
    name: "product_name",
    label: "Product Name",
    field: "product_name",
    align: "left" as const,
    sortable: true,
  },
  {
    name: "category",
    label: "Category",
    field: "category",
    align: "left" as const,
  },
  {
    name: "sku",
    label: "SKU",
    field: "sku",
    align: "left" as const,
  },
  {
    name: "unit_price",
    label: "Unit Price",
    field: "unit_price",
    align: "right" as const,
    format: (val: number) => formatValue("currency", val),
    sortable: true,
  },
  {
    name: "store_price",
    label: "Store Price",
    field: "store_price",
    align: "right" as const,
    format: (val: number) => formatValue("currency", val),
    sortable: true,
  },
  {
    name: "effective_date",
    label: "Effective Date",
    field: "effective_date",
    align: "center" as const,
    format: (val: string) => formatValue("date", val),
  },
  {
    name: "status",
    label: "Status",
    field: "status",
    align: "center" as const,
  },
];
