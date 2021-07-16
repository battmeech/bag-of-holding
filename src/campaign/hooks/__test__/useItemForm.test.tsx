import { MockedProvider } from "@apollo/client/testing";
import { act, renderHook } from "@testing-library/react-hooks";
import { useCreateItem, useEditItem } from "campaign/hooks/useItemForm";
import * as GQL from "@apollo/client";
import { waitFor } from "shared";
import { createItem } from "campaign/components/__test__/testData";

describe("useItemForm", () => {
  describe("useCreateItem", () => {
    const setupHook = ({ loading = false }: { loading?: boolean }) => {
      const mutateMock = jest.fn();
      const successCallbackMock = jest.fn();
      jest
        .spyOn(GQL, "useMutation")
        .mockReturnValue([mutateMock, { loading } as any]);

      const rendered = renderHook(
        () =>
          useCreateItem({
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
        name: "",
        description: undefined,
        quantity: "1",
      });
    });

    it("initialises isSaveEnabled as false", () => {
      const { result } = setupHook({});

      expect(result.current.isSaveEnabled).toStrictEqual(false);
    });

    it("updates the values when setValues is called", async () => {
      const { result } = setupHook({});

      act(() => {
        result.current.formProps.setValues({ key: "name", value: "new name" });
      });

      expect(result.current.formProps.values.name).toStrictEqual("new name");
    });

    it("is saved enabled is true when a name is entered", async () => {
      const { result } = setupHook({});

      act(() => {
        result.current.formProps.setValues({ key: "name", value: "new name" });
      });

      expect(result.current.isSaveEnabled).toStrictEqual(true);
    });

    it("is saved enabled is disabled when only a description is entered", async () => {
      const { result } = setupHook({});

      act(() => {
        result.current.formProps.setValues({
          key: "description",
          value: "test",
        });
      });

      expect(result.current.isSaveEnabled).toStrictEqual(false);
    });

    it("calling reset form resets the values to blank", async () => {
      const { result } = setupHook({});

      act(() => {
        result.current.formProps.setValues({
          key: "description",
          value: "test",
        });

        result.current.formProps.setValues({
          key: "name",
          value: "test",
        });
      });

      act(() => {
        result.current.resetForm();
      });

      expect(result.current.formProps.values).toStrictEqual({
        name: "",
        description: undefined,
        quantity: "1",
      });
    });

    it("entering a blank name results in an error", async () => {
      const { result } = setupHook({});

      act(() => {
        result.current.formProps.setValues({
          key: "name",
          value: "",
        });
      });

      expect(result.current.formProps.errors.get("name")).toStrictEqual(true);
    });

    it("returns saveLoading as true when the GQL query is in progress", async () => {
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
        result.current.formProps.setValues({
          key: "name",
          value: "Name",
        });
      });

      act(() => {
        result.current.saveItem();
      });

      await waitFor(() =>
        expect(mutateMock).toHaveBeenCalledWith({
          variables: {
            id: "campaignId",
            input: {
              description: undefined,
              name: "Name",
            },
          },
        })
      );
    });

    it("onSuccess is called after a successful GQL mutation", async () => {
      const { result, successCallbackMock } = setupHook({});

      act(() => {
        result.current.formProps.setValues({
          key: "name",
          value: "Name",
        });
      });

      act(() => {
        result.current.saveItem();
      });

      await waitFor(() => expect(successCallbackMock).toHaveBeenCalledWith());
    });

    it("form values are reset after success", async () => {
      const { result } = setupHook({});

      act(() => {
        result.current.formProps.setValues({
          key: "name",
          value: "Name",
        });
      });

      act(() => {
        result.current.saveItem();
      });

      await waitFor(() =>
        expect(result.current.formProps.values).toStrictEqual({
          name: "",
          description: undefined,
          quantity: "1",
        })
      );
    });
  });

  describe("useEditItem", () => {
    const setupHook = ({ loading = false }: { loading?: boolean }) => {
      const mutateMock = jest.fn();
      const successCallbackMock = jest.fn();
      jest
        .spyOn(GQL, "useMutation")
        .mockReturnValue([mutateMock, { loading } as any]);

      const rendered = renderHook(
        () =>
          useEditItem({
            existingItem: createItem({}),
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
        name: "Test name",
        description: "Test description",
        quantity: "1",
      });
    });

    it("initialises isSaveEnabled as true", () => {
      const { result } = setupHook({});

      expect(result.current.isSaveEnabled).toStrictEqual(true);
    });

    it("does not set new name if it was not changed", async () => {
      const { result, mutateMock } = setupHook({});

      act(() => {
        result.current.saveItem();
      });

      await waitFor(() =>
        expect(mutateMock).toHaveBeenCalledWith({
          variables: {
            id: "campaignId",
            input: {
              id: "item-id",
              description: "Test description",
              name: undefined,
            },
          },
        })
      );
    });

    it("sends new name if it was changed", async () => {
      const { result, mutateMock } = setupHook({});

      act(() => {
        result.current.formProps.setValues({
          key: "name",
          value: "Name",
        });
      });

      act(() => {
        result.current.saveItem();
      });

      await waitFor(() =>
        expect(mutateMock).toHaveBeenCalledWith({
          variables: {
            id: "campaignId",
            input: {
              id: "item-id",
              description: "Test description",
              name: "Name",
            },
          },
        })
      );
    });

    it("onSuccess is called after a successful GQL mutation", async () => {
      const { result, successCallbackMock } = setupHook({});

      act(() => {
        result.current.formProps.setValues({
          key: "name",
          value: "Name",
        });
      });

      act(() => {
        result.current.saveItem();
      });

      await waitFor(() => expect(successCallbackMock).toHaveBeenCalledWith());
    });

    it("form values are reset after success", async () => {
      const { result } = setupHook({});

      act(() => {
        result.current.formProps.setValues({
          key: "name",
          value: "Name",
        });
      });

      act(() => {
        result.current.saveItem();
      });

      await waitFor(() =>
        expect(result.current.formProps.values).toStrictEqual({
          name: "",
          description: undefined,
          quantity: "1",
        })
      );
    });
  });
});
