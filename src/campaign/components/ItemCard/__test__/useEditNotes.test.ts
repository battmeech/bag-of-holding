import * as GQL from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { act, renderHook } from "@testing-library/react-hooks";
import { waitFor } from "shared";
import { useEditNotes } from "../useEditNotes";

describe("useEditNotes", () => {
  const setupHook = (currentNotes = "notes") => {
    const mutateMock = jest.fn();
    jest.spyOn(GQL, "useMutation").mockReturnValue([mutateMock, {} as any]);

    const rendered = renderHook(
      () =>
        useEditNotes({
          itemId: "itemId",
          campaignId: "campaignId",
          currentNotes,
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
    const { result } = setupHook("Hello");

    expect(result.current.notes).toStrictEqual("Hello");
  });

  it("updates value", async () => {
    const { result } = setupHook();

    act(() => {
      result.current.setNotes("Good bye");
    });

    expect(result.current.notes).toStrictEqual("Good bye");
  });

  it("save is disabled on initial load", async () => {
    const { result } = setupHook("Hello");

    expect(result.current.saveActive).toStrictEqual(false);
  });

  it("save active becomes true when changes are made", async () => {
    const { result } = setupHook();

    act(() => {
      result.current.setNotes("Good bye");
    });

    expect(result.current.saveActive).toStrictEqual(true);
  });

  it("saves note value", async () => {
    const { result, mutateMock } = setupHook("Notes");

    act(() => {
      result.current.saveItem();
    });

    await waitFor(() =>
      expect(mutateMock).toHaveBeenCalledWith({
        variables: {
          id: "campaignId",
          input: {
            id: "itemId",
            notes: "Notes",
          },
        },
      })
    );
  });

  it("sets save active to false after saving", async () => {
    const { result } = setupHook();

    act(() => {
      result.current.setNotes("Good bye");
    });

    act(() => {
      result.current.saveItem();
    });

    await waitFor(() => expect(result.current.saveActive).toStrictEqual(false));
  });
});
