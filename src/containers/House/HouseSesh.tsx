import { Box, Card, Heading } from "@radix-ui/themes";

import { HouseInitialize } from "./HouseInitialize";
import { HouseKeypairUtility } from "./HouseKeypairUtility";
import { HouseKeypairInput } from "./HouseKeypairInput";
import { HouseFinishGame } from "./HouseFinishGame";
import { HouseDataInput } from "./HouseDataInput";

export function HouseSesh() {
  return (
    <Box grow={"1"} shrink={"1"}>
      <Card style={{ width: "100%" }}>
        <Heading size="4" align={"center"}>
          House
        </Heading>

        <HouseKeypairUtility />
        <HouseKeypairInput />
        <HouseInitialize />
        <HouseDataInput />
        <HouseFinishGame />
      </Card>
    </Box>
  );
}
