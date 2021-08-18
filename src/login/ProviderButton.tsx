import { Button } from "@chakra-ui/react";
import { ClientSafeProvider, signIn } from "next-auth/client";
import React from "react";

type ButtonStyling = {
  bgColor: string;
  color: string;
};

const colours: Record<string, ButtonStyling> = {
  GitHub: { bgColor: "black", color: "white" },
  Google: { bgColor: "blue", color: "red" },
  Twitch: { bgColor: "purple", color: "white" },
};

export const ProviderButton = ({
  provider,
  callbackUrl,
}: {
  provider: ClientSafeProvider;
  callbackUrl: string;
}) => {
  return (
    <Button
      bgColor={colours[provider.name].bgColor}
      color={colours[provider.name].color}
      key={provider.id}
      colorScheme="teal"
      onClick={() =>
        signIn(provider.id, {
          callbackUrl,
        })
      }
    >
      {provider.name}
    </Button>
  );
};
