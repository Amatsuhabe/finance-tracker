export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  icon: string;
  color: string;
  type: "income" | "expense";
}