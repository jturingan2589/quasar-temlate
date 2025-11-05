export interface PriceList {
  id: number;
  store_name: string;
  branch: string;
  product_name: string;
  category: string;
  sku: string;
  unit_price: number;
  store_price: number;
  effective_date: string; // ISO date string
  status: "Active" | "Inactive";
}
