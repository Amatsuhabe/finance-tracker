import { Category } from "./types";

export const DEFAULT_CATEGORIES: Category[] = [
  { name: "Salary", icon: "briefcase", color: "#22d3ee", type: "income" },
  { name: "Freelance", icon: "laptop", color: "#34d399", type: "income" },
  { name: "Food & Dining", icon: "utensils-crossed", color: "#f59e0b", type: "expense" },
  { name: "Transport", icon: "car", color: "#60a5fa", type: "expense" },
  { name: "Entertainment", icon: "tv", color: "#a78bfa", type: "expense" },
  { name: "Shopping", icon: "shopping-bag", color: "#f472b6", type: "expense" },
  { name: "Health", icon: "heart-pulse", color: "#fb7185", type: "expense" },
  { name: "Utilities", icon: "zap", color: "#fbbf24", type: "expense" },
  { name: "Rent", icon: "home", color: "#94a3b8", type: "expense" },
  { name: "Investments", icon: "trending-up", color: "#2dd4bf", type: "both" },
]
