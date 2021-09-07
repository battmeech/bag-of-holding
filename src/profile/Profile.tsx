import { Container, useToast } from "@chakra-ui/react";
import { PageHeading } from "shared/components/PageHeading";
import { AccountDetailsForm } from "signUp/components/AccountDetailsForm";
import { WithSession } from "types";

export const Profile: React.FC<WithSession> = () => {
  const toast = useToast({
    status: "success",
    description: "profile updated.",
    variant: "solid",
    isClosable: true,
    position: "bottom",
  });

  return (
    <>
      <PageHeading>my profile</PageHeading>
      <Container>
        <AccountDetailsForm onSuccessCallback={() => toast()} mt="8" />
      </Container>
    </>
  );
};
