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
import { HouseDataContext } from "./HouseDataContext";

export function HouseDataInput() {
  const [houseDataId, setHouseDataId] = useContext(HouseDataContext);

  return (
    <Container mb={"4"}>
      <Heading size="3" mb="2">
        Input HouseData ID
      </Heading>

      <Callout.Root mb="2">
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          Input HouseData ID everytime we refresh the page. HouseData existed
          only after initialization
        </Callout.Text>
      </Callout.Root>

      <Box mb="3">
        <Text>HouseData ID</Text>
        <TextFieldInput
          required
          placeholder="HouseData ID"
          value={houseDataId}
          onChange={(e) => {
            setHouseDataId(e.target.value);
          }}
        />
      </Box>
    </Container>
  );
}
