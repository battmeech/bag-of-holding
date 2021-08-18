import { Center, Text, VStack } from "@chakra-ui/react";
import { ClientSafeProvider, getProviders } from "next-auth/client";
import { useRouter } from "next/router";
import { ProviderButton } from "./ProviderButton";

export type SignInProps = {
  providers: Record<string, ClientSafeProvider>;
};

export const SignIn: React.FC<SignInProps> = ({ providers }) => {
  const { query } = useRouter();
  return (
    <>
      <Text>sign in with...</Text>
      <Center mt={8}>
        <VStack spacing={4}>
          {Object.values(providers).map((provider) => (
            <ProviderButton
              key={provider.id}
              provider={provider}
              callbackUrl={query.callbackUrl as string}
            />
          ))}
        </VStack>
      </Center>
    </>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
