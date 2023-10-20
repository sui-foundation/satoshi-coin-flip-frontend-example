import {
  useSignAndExecuteTransactionBlock,
  useSuiClient,
} from "@mysten/dapp-kit";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { SuiTransactionBlockResponse } from "@mysten/sui.js/client";
import { bcs } from "@mysten/sui.js/bcs";
import { bls12_381 as bls } from "@noble/curves/bls12-381";
import * as curveUtils from "@noble/curves/abstract/utils";

import { PACKAGE_ID } from "../../constants";
import { HouseKeypairContext } from "./HouseKeypairContext";
import { HouseDataContext } from "./HouseDataContext";

// This component will help the House to automatically finish the game whenever new game is started
export function HouseFinishGame() {
  const suiClient = useSuiClient();
  const { mutate: execFinishGame } = useSignAndExecuteTransactionBlock();

  const [housePrivHex] = useContext(HouseKeypairContext);
  const [houseDataId] = useContext(HouseDataContext);

  useEffect(() => {
    // Subscribe to NewGame event
    const unsub = suiClient.subscribeEvent({
      filter: {
        MoveEventType: `${PACKAGE_ID}::single_player_satoshi::NewGame`,
      },
      onMessage(event) {
        console.log(event);
        const { game_id, vrf_input } = event.parsedJson as {
          game_id: string;
          vrf_input: number[];
        };

        toast.info(`NewGame started ID: ${game_id}`);

        console.log(housePrivHex);

        try {
          const houseSignedInput = bls.sign(
            new Uint8Array(vrf_input),
            curveUtils.hexToBytes(housePrivHex),
          );

          // Finish the game immediately after new game started
          const txb = new TransactionBlock();
          txb.moveCall({
            target: `${PACKAGE_ID}::single_player_satoshi::finish_game`,
            arguments: [
              txb.pure.address(game_id),
              txb.pure(bcs.vector(bcs.U8).serialize(houseSignedInput)),
              txb.object(houseDataId),
            ],
          });
          execFinishGame(
            {
              transactionBlock: txb,
            },
            {
              onError: (err) => {
                toast.error(err.message);
              },
              onSuccess: (result: SuiTransactionBlockResponse) => {
                toast.success(`Digest: ${result.digest}`);
              },
            },
          );
        } catch (err) {
          console.error(err);
        }
      },
    });

    return () => {
      (async () => (await unsub)())();
    };
  }, [housePrivHex, houseDataId, suiClient]);

  return null;
}
