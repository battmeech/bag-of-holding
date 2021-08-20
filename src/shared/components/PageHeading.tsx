import { Heading, HeadingProps } from "@chakra-ui/react";

export const PageHeading: React.FC<HeadingProps> = (props) => (
  <Heading size="lg" textTransform="lowercase" {...props} />
);
