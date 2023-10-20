import { createContext, useState } from "react";

export type HouseDataContextVal = [string, (newHouseDataId: string) => void];

export const HouseDataContext = createContext<HouseDataContextVal>([
  "",
  () => {},
]);

export type HouseDataProps = {
  children: React.ReactNode;
};

export function HouseDataProvider({ children }: HouseDataProps) {
  const [houseDataId, setHouseDataId] = useState("");

  return (
    <HouseDataContext.Provider value={[houseDataId, setHouseDataId]}>
      {children}
    </HouseDataContext.Provider>
  );
}
