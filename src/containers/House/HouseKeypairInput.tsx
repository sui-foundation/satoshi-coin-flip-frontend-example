import { useContext } from "react";
import {
  Box,
  Container,
  Text,
  Heading,
  Callout,
  TextFieldInput,
} from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { HouseKeypairContext } from "./HouseKeypairContext";

export function HouseKeypairInput() {
  const [housePrivHex, , setHousePrivHex] = useContext(HouseKeypairContext);

  return (
    <Container mb={"4"}>
      <Heading size="3" mb="2">
        Input House Keypair
      </Heading>

      <Callout.Root mb="2">
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          Input the House Private Key everytime we refresh the page
        </Callout.Text>
      </Callout.Root>

      <Box mb="3">
        <Text>House Private Key</Text>
        <TextFieldInput
          required
          placeholder="House Private Key (Hex string without 0x prefix)"
          value={housePrivHex}
          onChange={(e) => {
            setHousePrivHex(e.target.value);
          }}
        />
      </Box>
    </Container>
  );
}
