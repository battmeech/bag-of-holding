import { Button, ButtonProps } from "@chakra-ui/react";
import { ClientSafeProvider, signIn } from "next-auth/client";
import { SiDiscord, SiGithub, SiGoogle, SiTwitch } from "react-icons/si";
import React from "react";

const icons: Record<string, React.ReactElement> = {
  GitHub: <SiGithub />,
  Google: <SiGoogle />,
  Twitch: <SiTwitch />,
  Discord: <SiDiscord />,
};

type ProviderButtonProps = {
  provider: ClientSafeProvider;
  callbackUrl: string;
} & ButtonProps;

export const ProviderButton = ({
  provider,
  callbackUrl,
  ...buttonProps
}: ProviderButtonProps) => {
  return (
    <Button
      leftIcon={icons[provider.name]}
      key={provider.id}
      colorScheme="teal"
      onClick={() =>
        signIn(provider.id, {
          callbackUrl,
        })
      }
      {...buttonProps}
    >
      {provider.name}
    </Button>
  );
};
