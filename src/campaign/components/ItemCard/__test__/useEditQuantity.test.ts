import * as GQL from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { act, renderHook } from "@testing-library/react-hooks";
import { waitFor } from "shared";
import { useEditQuantity } from "../useEditQuantity";

describe("useEditQuantity", () => {
  const setupHook = (currentQuantity = 1) => {
    const mutateMock = jest.fn();
    jest.spyOn(GQL, "useMutation").mockReturnValue([mutateMock, {} as any]);

    const rendered = renderHook(
      () =>
        useEditQuantity({
          itemId: "itemId",
          currentQuantity,
        }),
      {
        wrapper: MockedProvider,
      }
    );
    return { ...rendered, mutateMock };
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("initialises with values", () => {
    const { result } = setupHook(1);

    expect(result.current.quantity).toStrictEqual(1);
  });

  it("updates quantity", async () => {
    const { result } = setupHook();

    act(() => {
      result.current.setQuantity(2);
    });

    expect(result.current.quantity).toStrictEqual(2);
  });

  it("saves quantity", async () => {
    const { result, mutateMock } = setupHook();

    act(() => {
      result.current.saveItem(2);
    });

    await waitFor(() =>
      expect(mutateMock).toHaveBeenCalledWith({
        variables: {
          id: "itemId",
          input: {
            quantity: 2,
          },
        },
      })
    );
  });
});
