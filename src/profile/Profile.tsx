import { Container } from "@chakra-ui/react";
import React from "react";
import { PageHeading } from "shared/components/PageHeading";
import { AccountDetailsForm } from "signUp/components/AccountDetailsForm";
import { WithSession } from "types";

export const Profile: React.FC<WithSession> = () => {
  return (
    <>
      <PageHeading>my account</PageHeading>
      <Container>
        <AccountDetailsForm mt="8" />
      </Container>
    </>
  );
};
