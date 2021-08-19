import { Container, Heading } from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import { SignUpForm } from "./components/SignUpForm";

export const SignUp: React.FC = () => {
  const [session] = useSession();
  const router = useRouter();

  const onSubmit = () =>
    router.push((router.query.callbackUrl as string) || "/");
  return (
    <Container>
      <Heading textTransform="lowercase">
        welcome, {session?.user?.name || "adventurer"}
      </Heading>
      <Heading mt="2" size="sm">
        we just need a few more things to get you set up...
      </Heading>
      <SignUpForm onSubmit={onSubmit} />
    </Container>
  );
};
