/* istanbul ignore file */
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { ChakraProvider } from "@chakra-ui/react";
import { render, RenderOptions } from "@testing-library/react";
import React, { FC, ReactElement } from "react";
import customTheme from "styles/customTheme";
import { ModalProvider } from "./components/ModalProvider/ModalProvider";

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
        <ModalProvider>{children}</ModalProvider>
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
export { customRender as render };
export const waitForNextTick = () =>
  new Promise((resolve) => setTimeout(resolve));
