import { useState } from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Container,
  Text,
  Heading,
  TextFieldInput,
  Blockquote,
  Callout,
} from "@radix-ui/themes";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { MIST_PER_SUI } from "@mysten/sui.js/utils";
import { bcs } from "@mysten/sui.js/bcs";
import * as curveUtils from "@noble/curves/abstract/utils";

import { PACKAGE_ID } from "../../constants";
import { useSignAndExecuteTransactionBlock } from "@mysten/dapp-kit";

export function HouseInitialize() {
  const [houseStake, setHouseStake] = useState(0);
  const [housePubHex, setHousePubHex] = useState("");
  const [houseCapId, setHouseCapId] = useState("");

  // We have two options for signing and execute tx block:
  // 1. `useSignAndExecuteTransactionBlock` is a React hook from `@mysten/dapp-kit`
  // which utilize `SuiClient` from `@mysten/sui.js` behind the scene
  // 2. Use `SuiClient` instance directly.
  // We can obtain it through `useSuiClient` React hook from `@mysten/dapp-kit`
  const { mutate: execInitializeHouse, isLoading } =
    useSignAndExecuteTransactionBlock();

  return (
    <Container mb={"4"}>
      <Heading size="3" mb="2">
        Initialize House data
      </Heading>

      <Callout.Root color="yellow" mb="2">
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          You only need to initialize once. Second initialization will fail. If
          you want to re-initialize, please re-deploy the smart contract
        </Callout.Text>
      </Callout.Root>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          // Create new transaction block
          const txb = new TransactionBlock();
          // Split gas coin into house stake coin
          // SDK will take care for us abstracting away of up-front coin selections
          const [houseStakeCoin] = txb.splitCoins(txb.gas, [
            MIST_PER_SUI * BigInt(houseStake),
          ]);
          // Calling smart contract function
          txb.moveCall({
            target: `${PACKAGE_ID}::house_data::initialize_house_data`,
            arguments: [
              txb.object(houseCapId),
              houseStakeCoin,
              // This argument is not an on-chain object, hence, we must serialize it using `bcs`
              // https://sui-typescript-docs.vercel.app/typescript/transaction-building/basics#pure-values
              txb.pure(
                bcs
                  .vector(bcs.U8)
                  .serialize(curveUtils.hexToBytes(housePubHex)),
              ),
            ],
          });

          execInitializeHouse(
            {
              transactionBlock: txb,
              // There are 2 options for this
              // - WaitForLocalExecution (default): transaction is executed but finality not
              // - WaitForEffectsCert: wait for transaction block finality
              requestType: "WaitForEffectsCert",
            },
            {
              onError: (err) => {
                alert(err.message);
              },
              onSuccess: (result) => {
                alert(`Digest: ${result.digest}`);
              },
            },
          );
        }}
      >
        <Box mb="3">
          <Text>HouseCap ID</Text>
          <TextFieldInput
            required
            placeholder="HouseCap ID"
            onChange={(e) => {
              setHouseCapId(e.target.value);
            }}
          />
        </Box>

        <Box mb="3">
          <Text>House Stake</Text>
          <TextFieldInput
            placeholder="House Stake (in SUI)"
            type="number"
            required
            onChange={(e) => {
              setHouseStake(e.target.valueAsNumber);
            }}
          />
        </Box>

        <Box mb="3">
          <Text>House Public Key</Text>
          <TextFieldInput
            required
            placeholder="House Public Key (Hex string without 0x prefix)"
            onChange={(e) => {
              setHousePubHex(e.target.value);
            }}
          />
        </Box>

        <Button disabled={isLoading} type="submit">
          Initialize
        </Button>
      </form>
    </Container>
  );
}
