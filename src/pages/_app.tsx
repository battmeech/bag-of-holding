/* istanbul ignore file */
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/lexend/latin.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { client, Layout, ModalProvider } from "shared";
import customTheme from "styles/customTheme";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={customTheme}>
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
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default MyApp;
