export interface TableColumn {
  name: string;
  label: string;
  field: string | ((row: TableRow) => any);
  align?: "left" | "right" | "center";
  sortable?: boolean;
}

export interface TableRow {
  id?: string | number;
  product?: { name: string; img: string };
  [key: string]: any;
}

export interface TableAction {
  name: string;
  icon?: string; // optional for switch-type
  color?: string;
  label?: string;
  type?: "button" | "switch"; // make it a union instead of string
  field?: string; // only used if type === "switch"
  func: (row: TableRow, value?: any) => void; // switch passes value too
}
