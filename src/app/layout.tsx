import { Providers } from "@app/providers";
import "@fontsource/lexend/latin.css";
import { ReactNode } from "react";
import { Box } from "@chakra-ui/layout";
import { getServerSession } from "next-auth";
import { Header } from "@ui-components/Header";
import { authOptions } from "@app-auth/next-auth";
import { ClientProvider } from "@app/trpc-provider";

export const metadata = {
  title: "bag of holding",
  description: "the place to store your loot",
};

async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <Box m="0 auto" maxWidth={1200} transition="0.5s ease-out" as="body">
        <Providers session={session}>
          <ClientProvider>
            <Box m={8}>
              <Header />
              <Box as="main" my={22}>
                {children}
              </Box>
            </Box>
          </ClientProvider>
        </Providers>
      </Box>
    </html>
  );
}

export default RootLayout;
