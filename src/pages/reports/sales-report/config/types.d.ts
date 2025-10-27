export interface SalesReport {
  id: number;
  date: string;
  invoiceNo: string;
  storeName: string;
  customerName: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  paymentMethod: string;
  status: "Paid" | "Pending" | "Refunded";
  salesRep: string;
}
