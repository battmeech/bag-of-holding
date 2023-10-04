import { Heading, HeadingProps } from "@chakra-ui/react";
import { FC } from "react";

export const PageHeading: FC<HeadingProps> = (props) => (
  <Heading size="lg" textTransform="lowercase" {...props} />
);
