type TransactionType = "income" | "expense" | "both"

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  description: string | null;
  type: TransactionType;
  category: Category;
}

export interface Category {
  id: string;
  name: string,
  color: string,
  icon: string,
  type: TransactionType
}