export interface Transaction {
  title: string;
  amount: number;
  date: string;
  category: string;
  icon: string;
  color: string;
  type: "income" | "expense";
}

export interface Category {
  name: string,
  color: string,
  icon: string
}