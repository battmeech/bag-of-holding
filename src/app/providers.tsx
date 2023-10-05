"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { customTheme } from "@ui-styling/theme";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ReactNode } from "react";
import { ModalProvider } from "@ui-components/ModalProvider";
import { ClientProvider } from "@app/trpc-provider";

export const Providers = ({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) => (
  <SessionProvider session={session}>
    <ClientProvider>
      <CacheProvider>
        <ChakraProvider theme={customTheme}>
          <ModalProvider>{children}</ModalProvider>
        </ChakraProvider>
      </CacheProvider>
    </ClientProvider>
  </SessionProvider>
);
