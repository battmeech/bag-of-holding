import { Container, Heading, Text, VStack } from "@chakra-ui/react";
import { ClientSafeProvider, getProviders } from "next-auth/client";
import { useRouter } from "next/router";
import { PageHeading } from "shared/components/PageHeading";
import { ProviderButton } from "./ProviderButton";

export type SignInProps = {
  providers: Record<string, ClientSafeProvider>;
};

export const SignIn: React.FC<SignInProps> = ({ providers }) => {
  const { query } = useRouter();
  return (
    <>
      <PageHeading>sign in</PageHeading>
      <Container mt={8}>
        <VStack spacing={4} align="flex-start">
          <Heading size="md">
            {"you'll need to sign in to access   your loot!"}
          </Heading>
          <Text>choose an existing account to login with</Text>
          {Object.values(providers).map((provider) => (
            <ProviderButton
              w="full"
              key={provider.id}
              provider={provider}
              callbackUrl={query.callbackUrl as string}
            />
          ))}
        </VStack>
      </Container>
    </>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
