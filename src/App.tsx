import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Box, Callout, Container, Flex, Grid, Heading } from "@radix-ui/themes";
import { PlayerSesh } from "./containers/Player/PlayerSesh";
import { HouseSesh } from "./containers/House/HouseSesh";
import { HOUSECAP_ID, PACKAGE_ID } from "./constants";
import { InfoCircledIcon } from "@radix-ui/react-icons";

function App() {
  const account = useCurrentAccount();
  return (
    <>
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
        }}
      >
        <Box>
          <Heading>Satoshi Coin Flip Single Player</Heading>
        </Box>

        <Box>
          <ConnectButton />
        </Box>
      </Flex>
      <Container>
        <Heading size="4" m={"2"}>
          Package ID: {PACKAGE_ID}
        </Heading>
        <Heading size="4" m={"2"}>
          HouseCap ID: {HOUSECAP_ID}
        </Heading>

        <Callout.Root mb="2">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            You need to connect to wallet that publish the smart contract
            package
          </Callout.Text>
        </Callout.Root>

        {!account ? (
          <Heading size="4" align="center">
            Please connect wallet to continue
          </Heading>
        ) : (
          <Grid columns="2" gap={"3"} width={"auto"}>
            <PlayerSesh />
            <HouseSesh />
          </Grid>
        )}
      </Container>
    </>
  );
}

export default App;
