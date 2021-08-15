import { Button, Text, Stack } from "@chakra-ui/react";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/client";
import { useRouter } from "next/router";

export type SignInProps = {
  providers: Record<string, ClientSafeProvider>;
};

const SignIn: React.FC<SignInProps> = ({ providers }) => {
  const { query } = useRouter();
  return (
    <>
      <Text>sign in with...</Text>
      <Stack mt="8" direction={{ base: "column", md: "row" }}>
        {Object.values(providers).map((provider) => (
          <Button
            key={provider.id}
            colorScheme="teal"
            onClick={() =>
              signIn(provider.id, { callbackUrl: query.callbackUrl as string })
            }
          >
            {provider.name}
          </Button>
        ))}
      </Stack>
    </>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default SignIn;
