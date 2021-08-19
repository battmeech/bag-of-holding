import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useBreakpoint,
  useClipboard,
} from "@chakra-ui/react";
import React, { useState } from "react";

export const ShareCampaign = () => {
  const [url] = useState(window.location.href.replace("/campaigns/", "/join/"));

  const { hasCopied, onCopy } = useClipboard(url);
  const breakpoint = useBreakpoint();

  const onClick = async () => {
    onCopy();
    if (navigator.share)
      await navigator.share({
        text: `Hello! I need some help managing all our treasure.`,
        title: "Bag of Holding",
        url,
      });
  };

  switch (breakpoint) {
    case "base":
    case "sm":
      return (
        <Button colorScheme="teal" onClick={onClick}>
          {hasCopied ? "copied" : "share"}
        </Button>
      );
    default:
      return (
        <InputGroup w="md">
          <Input defaultValue={url} />
          <InputRightElement w="fit-content">
            <Button
              colorScheme="teal"
              w="full"
              h="1.75rem"
              size="sm"
              onClick={onClick}
              mx={2}
            >
              {hasCopied ? "copied" : "share"}
            </Button>
          </InputRightElement>
        </InputGroup>
      );
  }
};