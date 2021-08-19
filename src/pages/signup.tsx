import { Button, Heading, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React from "react";

const SignUp: React.FC = () => {
  const { query } = useRouter();
  return (
    <>
      <Heading>this is a signup page please fill me in</Heading>
      <Link as={NextLink} href={(query.callbackUrl as string) || "/campaigns"}>
        <Button>submit</Button>
      </Link>
    </>
  );
};

export default SignUp;
