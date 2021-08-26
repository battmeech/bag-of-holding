import * as GQL from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { act, renderHook } from "@testing-library/react-hooks";
import { waitFor } from "shared";
import { useMoneyForm } from "../useMoneyForm";

describe("useMoneyForm", () => {
  const setupHook = ({ loading = false }: { loading?: boolean }) => {
    const mutateMock = jest.fn();
    const successCallbackMock = jest.fn();
    jest
      .spyOn(GQL, "useMutation")
      .mockReturnValue([mutateMock, { loading } as any]);

    const rendered = renderHook(
      () =>
        useMoneyForm({
          campaignId: "campaignId",
          onSuccessCallback: successCallbackMock,
        }),
      {
        wrapper: MockedProvider,
      }
    );
    return { ...rendered, mutateMock, successCallbackMock };
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("initialises form props with values", () => {
    const { result } = setupHook({});

    expect(result.current.formProps.values).toStrictEqual({
      copper: 0,
      electrum: 0,
      gold: 0,
      platinum: 0,
      silver: 0,
    });
  });

  it("initialises isSaveEnabled as false", () => {
    const { result } = setupHook({});

    expect(result.current.isSaveEnabled).toStrictEqual(false);
  });

  it("updates the values when setValue is called number", async () => {
    const { result } = setupHook({});

    act(() => {
      result.current.formProps.setValue("copper", 2);
    });

    expect(result.current.formProps.values.copper).toStrictEqual(2);
  });

  it("returns loading as true when the GQL query is in progress", async () => {
    const { result } = setupHook({ loading: true });

    expect(result.current.saveLoading).toStrictEqual(true);
  });

  it("returns saveLoading as false when the GQL query is in progress", async () => {
    const { result } = setupHook({ loading: false });

    expect(result.current.saveLoading).toStrictEqual(false);
  });

  it("calling save causes a GQL mutation", async () => {
    const { result, mutateMock } = setupHook({});

    act(() => {
      result.current.formProps.setValue("copper", 2);
    });

    act(() => {
      result.current.handleSubmit("add")();
    });

    await waitFor(() =>
      expect(mutateMock).toHaveBeenCalledWith({
        variables: {
          id: "campaignId",
          input: {
            copper: 2,
            electrum: 0,
            gold: 0,
            modification: "ADD",
            platinum: 0,
            silver: 0,
          },
        },
      })
    );
  });
});
