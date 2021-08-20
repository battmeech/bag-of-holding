import {
  Button,
  Input,
  InputGroup,
  InputRightAddon,
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
          <Input isReadOnly defaultValue={url} />
          <InputRightAddon cursor="pointer" onClick={onClick} w="fit-content">
            {hasCopied ? "copied" : "share"}
          </InputRightAddon>
        </InputGroup>
      );
  }
};
