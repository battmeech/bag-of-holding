import { Box } from "@chakra-ui/layout";
import { ReactNode } from "react";
import Header from "./Header";
import Meta from "./Meta";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box m="0 auto" maxWidth={1200} transition="0.5s ease-out">
      <Meta />
      <Box m={8}>
        <Header />
        <Box as="main" my={22}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
