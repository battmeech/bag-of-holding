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

  it("updates the values when setValues is called number", async () => {
    const { result } = setupHook({});

    act(() => {
      result.current.formProps.setValues({ key: "copper", value: 2 });
    });

    expect(result.current.formProps.values.copper).toStrictEqual(2);
  });

  it("when NaN is passed in, does not update value", async () => {
    const { result } = setupHook({});

    act(() => {
      result.current.formProps.setValues({
        key: "copper",
        value: Number("NaN"),
      });
    });

    expect(result.current.formProps.values.copper).toStrictEqual(0);
  });

  it("updates the values when setValues is called with a string", async () => {
    const { result } = setupHook({});

    act(() => {
      result.current.formProps.setValues({ key: "copper", value: "2" });
    });

    expect(result.current.formProps.values.copper).toStrictEqual(2);
  });

  it("does not update the value when an invalid value is passed in", async () => {
    const { result } = setupHook({});

    act(() => {
      result.current.formProps.setValues({ key: "copper", value: "invalid" });
    });

    expect(result.current.formProps.values.copper).toStrictEqual(0);
  });

  it("does not update the value when a negative value is passed in", async () => {
    const { result } = setupHook({});

    act(() => {
      result.current.formProps.setValues({ key: "copper", value: -1 });
    });

    expect(result.current.formProps.values.copper).toStrictEqual(0);
  });

  it("updates the value when nothing is passed in", async () => {
    const { result } = setupHook({});

    act(() => {
      result.current.formProps.setValues({ key: "copper", value: "" });
    });

    expect(result.current.formProps.values.copper).toStrictEqual("");
  });

  it("has an error when nothing is passed in", async () => {
    const { result } = setupHook({});

    act(() => {
      result.current.formProps.setValues({ key: "copper", value: "" });
    });

    expect(result.current.formProps.errors.get("copper")).toStrictEqual(true);
  });

  it("updates the value when nothing is passed in", async () => {
    const { result } = setupHook({});

    act(() => {
      result.current.formProps.setValues({ key: "copper", value: "" });
    });

    expect(result.current.formProps.values.copper).toStrictEqual("");
  });

  it("is saved enabled is true when a valid number is entered into a field", async () => {
    const { result } = setupHook({});

    act(() => {
      result.current.formProps.setValues({ key: "copper", value: 2 });
    });

    expect(result.current.isSaveEnabled).toStrictEqual(true);
  });

  it("is saved enabled is false if any field is empty", async () => {
    const { result } = setupHook({});

    act(() => {
      result.current.formProps.setValues({ key: "copper", value: 2 });
      result.current.formProps.setValues({ key: "silver", value: "" });
    });

    expect(result.current.isSaveEnabled).toStrictEqual(false);
  });

  it("calling reset form resets the values to blank", async () => {
    const { result } = setupHook({});

    act(() => {
      result.current.formProps.setValues({ key: "copper", value: 2 });
      result.current.formProps.setValues({ key: "silver", value: "" });
    });

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.formProps.values).toStrictEqual({
      copper: 0,
      electrum: 0,
      gold: 0,
      platinum: 0,
      silver: 0,
    });
  });

  it("returns loading as true when the GQL query is in progress", async () => {
    const { result } = setupHook({ loading: true });

    expect(result.current.loading).toStrictEqual(true);
  });

  it("returns saveLoading as false when the GQL query is in progress", async () => {
    const { result } = setupHook({ loading: false });

    expect(result.current.loading).toStrictEqual(false);
  });

  it("calling save causes a GQL mutation", async () => {
    const { result, mutateMock } = setupHook({});

    act(() => {
      result.current.formProps.setValues({ key: "copper", value: 2 });
      result.current.formProps.setValues({ key: "silver", value: "" });
    });

    act(() => {
      result.current.modifyMoney("add");
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
            silver: "",
          },
        },
      })
    );
  });
});
