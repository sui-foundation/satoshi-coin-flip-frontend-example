import { useState } from "react";
import { Box, Button, Container, Text, Heading } from "@radix-ui/themes";
import { bls12_381 as bls } from "@noble/curves/bls12-381";
import * as curveUtils from "@noble/curves/abstract/utils";

export function HouseKeypair() {
  const [housePriv, setHousePriv] = useState<Uint8Array | null>(null);

  return (
    <Container mb={"4"}>
      <Heading size="3" mb="2">
        Generate House Keypair (Optional)
      </Heading>
      {housePriv && (
        <Box mb="2">
          <Text as="div">Private Key: </Text>
          <Text as="div">{curveUtils.bytesToHex(housePriv)}</Text>
          <Text as="div">Public Key: </Text>
          <Text as="div">
            {curveUtils.bytesToHex(bls.getPublicKey(housePriv))}
          </Text>
        </Box>
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
