import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Text,
  Heading,
  Callout,
} from "@radix-ui/themes";
import { bls12_381 as bls } from "@noble/curves/bls12-381";
import * as curveUtils from "@noble/curves/abstract/utils";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export function HouseKeypairUtility() {
  const [housePriv, setHousePriv] = useState<Uint8Array | null>(null);

  return (
    <Container mb={"4"}>
      <Heading size="3" mb="2">
        Generate House Keypair (Utility)
      </Heading>

      {housePriv && (
        <>
          <Callout.Root mb="2">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              You should save this somewhere because it will be lost when
              refresh the page
            </Callout.Text>
          </Callout.Root>

          <Box mb="2">
            <Text as="div" weight="bold">
              Private Key:
            </Text>
            <Text as="div">{curveUtils.bytesToHex(housePriv)}</Text>
            <Text as="div" weight="bold">
              Public Key:
            </Text>
            <Text as="div">
              {curveUtils.bytesToHex(bls.getPublicKey(housePriv))}
            </Text>
          </Box>
        </>
      )}

      <Button
        onClick={() => {
          const housePrivKey = bls.utils.randomPrivateKey();
          setHousePriv(housePrivKey);
        }}
      >
        Generate
      </Button>
    </Container>
  );
}
