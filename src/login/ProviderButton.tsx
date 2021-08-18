import { Button } from "@chakra-ui/react";
import { ClientSafeProvider, signIn } from "next-auth/client";
import { SiGithub, SiGoogle, SiTwitch } from "react-icons/si";
import React from "react";

const icons: Record<string, React.ReactElement> = {
  GitHub: <SiGithub />,
  Google: <SiGoogle />,
  Twitch: <SiTwitch />,
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
      leftIcon={icons[provider.name]}
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
