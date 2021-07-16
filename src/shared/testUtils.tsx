/* istanbul ignore file */
import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "styles/customTheme";
import { ModalProvider } from "./ModalProvider";
import { Layout } from "shared";

type TestContextProviderProps = {
  mocks?: MockedResponse<Record<string, any>>[];
};

const TestContextProvider: FC<TestContextProviderProps> = ({
  children,
  mocks = [],
}) => {
  return (
    <MockedProvider mocks={mocks}>
      <ChakraProvider theme={customTheme}>
        <ModalProvider>
          <Layout>{children}</Layout>
        </ModalProvider>
      </ChakraProvider>
    </MockedProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
  mocks?: MockedResponse<Record<string, any>>[]
) =>
  render(ui, {
    // eslint-disable-next-line react/display-name
    wrapper: (props) => <TestContextProvider {...props} mocks={mocks} />,
    ...options,
  });

export * from "@testing-library/react";
export const waitForNextTick = () =>
  new Promise((resolve) => setTimeout(resolve));
export { customRender as render };
