/* istanbul ignore file */
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/lexend/latin.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { client, Layout, ModalProvider } from "shared";
import customTheme from "styles/customTheme";
import { Provider as SessionProvider } from "next-auth/client";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={customTheme}>
        <SessionProvider session={pageProps.session}>
          <ModalProvider>
            <Head>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
              />
            </Head>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ModalProvider>
        </SessionProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default MyApp;
