import { Container, Heading } from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { PageHeading } from "shared/components/PageHeading";
import { AccountDetailsForm } from "./components/AccountDetailsForm";

export const SignUp: React.FC = () => {
  const [session] = useSession();
  const router = useRouter();

  const onSuccess = () => {
    router.push((router.query.callbackUrl as string) || "/campaigns");
  };

  return (
    <>
      <PageHeading>welcome, {session?.user?.name || "adventurer"}</PageHeading>
      <Heading mt="2" size="sm">
        we just need a few more things to get you set up...
      </Heading>
      <Container>
        <AccountDetailsForm onSuccessCallback={onSuccess} mt="8" isSignUp />
      </Container>
    </>
  );
};
