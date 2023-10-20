import { Box, Card, Heading } from "@radix-ui/themes";
import { PlayerCreateGame } from "./PlayerCreateGame";
import { PlayerListCounterNft } from "./PlayerListCounterNft";

export function PlayerSesh() {
  return (
    <Box grow={"1"} shrink={"1"}>
      <Card style={{ width: "100%" }}>
        <Heading size="4" align={"center"}>
          Player
        </Heading>

        <PlayerListCounterNft />
        <PlayerCreateGame />
      </Card>
    </Box>
  );
}
