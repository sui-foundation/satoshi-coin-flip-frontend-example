import { useContext, useState } from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Container,
  Text,
  Heading,
  TextFieldInput,
  Callout,
} from "@radix-ui/themes";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { MIST_PER_SUI } from "@mysten/sui.js/utils";
import { bcs } from "@mysten/sui.js/bcs";
import * as curveUtils from "@noble/curves/abstract/utils";
import { toast } from "react-toastify";

import { HOUSECAP_ID, PACKAGE_ID } from "../../constants";
import { useSignAndExecuteTransactionBlock } from "@mysten/dapp-kit";
import { SuiTransactionBlockResponse } from "@mysten/sui.js/client";
import { HouseKeypairContext } from "./HouseKeypairContext";

export function HouseInitialize() {
  const [houseStake, setHouseStake] = useState(0);
  const [houseDataId, setHouseDataId] = useState("");

  const [, getHousePubHex] = useContext(HouseKeypairContext);

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
              txb.object(HOUSECAP_ID),
              houseStakeCoin,
              // This argument is not an on-chain object, hence, we must serialize it using `bcs`
              // https://sui-typescript-docs.vercel.app/typescript/transaction-building/basics#pure-values
              txb.pure(
                bcs
                  .vector(bcs.U8)
                  .serialize(curveUtils.hexToBytes(getHousePubHex())),
              ),
            ],
          });

          execInitializeHouse(
            {
              transactionBlock: txb,
              options: {
                showObjectChanges: true,
              },
            },
            {
              onError: (err) => {
                toast.error(err.message);
              },
              onSuccess: (result: SuiTransactionBlockResponse) => {
                let houseDataObjId;

                result.objectChanges?.some((objCh) => {
                  if (
                    objCh.type === "created" &&
                    objCh.objectType === `${PACKAGE_ID}::house_data::HouseData`
                  ) {
                    houseDataObjId = objCh.objectId;
                    return true;
                  }
                });

                setHouseDataId(houseDataObjId!);

                toast.success(`Digest: ${result.digest}`);
              },
            },
          );
        }}
      >
        <Box mb="3">
          <Text>House Stake</Text>
          <TextFieldInput
            placeholder="House Stake (in SUI)"
            required
            onChange={(e) => {
              setHouseStake(Number(e.target.value));
            }}
          />
        </Box>

        <Button disabled={isLoading} type="submit">
          Initialize
        </Button>

        {houseDataId && (
          <>
            <Box mb="2">
              <Text as="div">HouseData ID: </Text>
              <Text as="div">{houseDataId}</Text>
            </Box>

            <Callout.Root mb="2">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>
                You should save HouseData ID somewhere because it will be lost
                when refresh the page
              </Callout.Text>
            </Callout.Root>
          </>
        )}
      </form>
    </Container>
  );
}
