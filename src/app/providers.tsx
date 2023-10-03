"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { customTheme } from "@/theme";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export const Providers = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => (
  <SessionProvider session={session}>
    <CacheProvider>
      <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
    </CacheProvider>
  </SessionProvider>
);
