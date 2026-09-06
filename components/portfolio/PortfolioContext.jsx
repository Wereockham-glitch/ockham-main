import { createContext, useContext, useState } from "react";

const PortfolioContext = createContext(null);
export function PortfolioProvider({ children }) {
  const [category, setCategory] = useState("campaigns");
  return <PortfolioContext.Provider value={{ category, setCategory }}>{children}</PortfolioContext.Provider>;
}
export const usePortfolio = () => useContext(PortfolioContext);
