import { createContext, useState } from "react";
import { bls12_381 as bls } from "@noble/curves/bls12-381";
import * as curveUtils from "@noble/curves/abstract/utils";

export type HouseKeypairContextVal = [
  string,
  () => string,
  (newPrivKeyHex: string) => void,
];

export const HouseKeypairContext = createContext<HouseKeypairContextVal>([
  "",
  () => "",
  () => {},
]);

export type HouseKeypairProps = {
  children: React.ReactNode;
};

export function HouseKeypairProvider({ children }: HouseKeypairProps) {
  const [privKeyHex, setPrivKeyHex] = useState("");

  return (
    <HouseKeypairContext.Provider
      value={[
        privKeyHex,
        () => {
          return curveUtils.hexToBytes(privKeyHex).length === 32
            ? curveUtils.bytesToHex(bls.getPublicKey(privKeyHex))
            : "";
        },
        setPrivKeyHex,
      ]}
    >
      {children}
    </HouseKeypairContext.Provider>
  );
}
