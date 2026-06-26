type TransactionType = "income" | "expense" | "both"

export interface Transaction {
  title: string;
  amount: number;
  date: string;
  category: string;
  icon: string;
  color: string;
  type: TransactionType;
}

export interface Category {
  name: string,
  color: string,
  icon: string,
  type: TransactionType
}