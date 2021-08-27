import * as GQL from "@apollo/client";
import { act, renderHook } from "@testing-library/react-hooks";
import { waitFor } from "shared";
import { createItem } from "shared/testData";
import { useCreateItem, useEditItem } from "../useItemForm";

describe("useItemForm", () => {
  describe("useCreateItem", () => {
    const setupHook = ({ loading = false }: { loading?: boolean }) => {
      const mutateMock = jest.fn();
      const successCallbackMock = jest.fn();
      jest
        .spyOn(GQL, "useMutation")
        .mockReturnValue([mutateMock, { loading } as any]);

      const rendered = renderHook(() =>
        useCreateItem({
          campaignId: "campaignId",
          onSuccessCallback: successCallbackMock,
        })
      );
      return { ...rendered, mutateMock, successCallbackMock };
    };

    beforeEach(() => {
      jest.resetAllMocks();
    });

    it("initialises form props with values", async () => {
      const { result } = setupHook({});

      await waitFor(() => {
        expect(result.current.formProps.values).toStrictEqual({
          description: "",
          name: "",
          quantity: 1,
          tags: [],
        });
      });
    });

    it("initialises isSaveEnabled as false", async () => {
      const { result } = setupHook({});

      await waitFor(() => {
        expect(result.current.isSaveEnabled).toStrictEqual(false);
      });
    });

    it("updates the values when setValues is called", async () => {
      const { result } = setupHook({});

      act(() => {
        result.current.formProps.setValue("name", "new name");
      });

      await waitFor(() => {
        expect(result.current.formProps.values.name).toStrictEqual("new name");
      });
    });

    it("is saved enabled is true when a name is entered", async () => {
      const { result } = setupHook({});

      act(() => {
        result.current.formProps.setValue("name", "new name");
      });

      await waitFor(() => {
        expect(result.current.isSaveEnabled).toStrictEqual(true);
      });
    });

    it("is saved enabled is disabled when only a description is entered", async () => {
      const { result } = setupHook({});

      act(() => {
        result.current.formProps.setValue("description", "new");
      });

      await waitFor(() => {
        expect(result.current.isSaveEnabled).toStrictEqual(false);
      });
    });

    it("returns saveLoading as true when the GQL query is in progress", async () => {
      const { result } = setupHook({ loading: true });

      await waitFor(() => {
        expect(result.current.saveLoading).toStrictEqual(true);
      });
    });

    it("returns saveLoading as false when the GQL query is in progress", async () => {
      const { result } = setupHook({ loading: false });

      await waitFor(() => {
        expect(result.current.saveLoading).toStrictEqual(false);
      });
    });

    it("calling save causes a GQL mutation", async () => {
      const { result, mutateMock } = setupHook({});

      act(() => {
        result.current.formProps.setValue("name", "Name");
      });

      act(() => {
        result.current.saveItem();
      });

      await waitFor(() =>
        expect(mutateMock).toHaveBeenCalledWith({
          variables: {
            id: "campaignId",
            input: {
              description: "",
              name: "Name",
              quantity: 1,
              tags: undefined,
            },
          },
        })
      );
    });

    it("onSuccess is called after a successful GQL mutation", async () => {
      const { result, successCallbackMock } = setupHook({});

      act(() => {
        result.current.formProps.setValue("name", "Name");
      });

      act(() => {
        result.current.saveItem();
      });

      await waitFor(() => expect(successCallbackMock).toHaveBeenCalledWith());
    });
  });

  describe("useEditItem", () => {
    const setupHook = ({ loading = false }: { loading?: boolean }) => {
      const mutateMock = jest.fn();
      const successCallbackMock = jest.fn();
      jest
        .spyOn(GQL, "useMutation")
        .mockReturnValue([mutateMock, { loading } as any]);

      const rendered = renderHook(() =>
        useEditItem({
          existingItem: createItem({}),
          onSuccessCallback: successCallbackMock,
        })
      );
      return { ...rendered, mutateMock, successCallbackMock };
    };

    beforeEach(() => {
      jest.resetAllMocks();
    });

    it("initialises form props with values", async () => {
      const { result } = setupHook({});

      await waitFor(() => {
        expect(result.current.formProps.values).toStrictEqual({
          name: "Test name",
          description: "Test description",
          quantity: 1,
          tags: ["tag-a", "tag-b"],
        });
      });
    });

    it("initialises isSaveEnabled as true", async () => {
      const { result } = setupHook({});

      await waitFor(() => {
        expect(result.current.isSaveEnabled).toStrictEqual(true);
      });
    });

    it("sends new name if it was changed", async () => {
      const { result, mutateMock } = setupHook({});

      act(() => {
        result.current.formProps.setValue("name", "Name");
      });

      act(() => {
        result.current.saveItem();
      });

      await waitFor(() =>
        expect(mutateMock).toHaveBeenCalledWith({
          variables: {
            id: "item-id",
            input: {
              description: "Test description",
              name: "Name",
              quantity: 1,
              tags: ["tag-a", "tag-b"],
            },
          },
        })
      );
    });

    it("onSuccess is called after a successful GQL mutation", async () => {
      const { result, successCallbackMock } = setupHook({});

      act(() => {
        result.current.formProps.setValue("name", "Name");
      });

      act(() => {
        result.current.saveItem();
      });

      await waitFor(() => expect(successCallbackMock).toHaveBeenCalledWith());
    });

    describe("tags", () => {
      it("can successfully add a tag", async () => {
        const { result } = setupHook({});

        act(() => {
          result.current.formProps.setValue("tags", [
            ...result.current.formProps.values.tags!,
            "test",
          ]);
        });

        await waitFor(() => {
          expect(result.current.formProps.values.tags).toStrictEqual([
            "tag-a",
            "tag-b",
            "test",
          ]);
        });
      });

      it("can successfully remove a tag", async () => {
        const { result } = setupHook({});

        act(() => {
          result.current.formProps.setValue("tags", ["tag-q"]);
        });

        await waitFor(() => {
          expect(result.current.formProps.values.tags).toStrictEqual(["tag-q"]);
        });
      });
    });
  });
});
