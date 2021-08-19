import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
  useClipboard,
} from "@chakra-ui/react";
import React, { useState } from "react";

export const ShareCampaign = () => {
  const [value] = useState(
    window.location.href.replace("/campaigns/", "/join/")
  );

  const { hasCopied, onCopy } = useClipboard(value);

  return (
    <InputGroup w="md">
      <Input pr="4.5rem" value={value} />
      <InputRightElement w="fit-content">
        <Button
          colorScheme="teal"
          w="full"
          h="1.75rem"
          size="sm"
          onClick={onCopy}
          mx="1"
        >
          {hasCopied ? "copied" : "share"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
