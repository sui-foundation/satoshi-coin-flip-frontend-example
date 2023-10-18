import { useCurrentAccount } from "@mysten/dapp-kit";
import { Card, Heading } from "@radix-ui/themes";

import { HouseInitialize } from "./HouseInitialize";
import { HouseKeypair } from "./HouseKeypair";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export function HouseSesh() {
  const account = useCurrentAccount();

  return (
    <Card style={{ width: "100%" }}>
      <Heading size="4" align={"center"}>
        House
      </Heading>

      {!account ? (
        <Heading size="4">Please connect wallet to continue</Heading>
      ) : (
        <>
          <HouseKeypair />
          <HouseInitialize />
        </>
      )}
    </Card>
  );
}
