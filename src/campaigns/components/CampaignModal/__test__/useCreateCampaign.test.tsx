import { useMutation } from "@apollo/client";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { waitFor } from "shared";
import { useCreateCampaign } from "../useCreateCampaign";

jest.mock("@apollo/client");

describe("useCreateCampaign", () => {
  const setupHook = ({ loading = false }: { loading?: boolean }) => {
    const mutateMock = jest.fn();
    const successCallbackMock = jest.fn();

    mutateMock.mockResolvedValue({
      data: { createCampaign: { id: "123" } },
    });

    (useMutation as jest.Mock).mockReturnValue([mutateMock, { loading }]);

    const rendered = renderHook(() =>
      useCreateCampaign({
        onSuccessCallback: successCallbackMock,
      })
    );
    return { ...rendered, mutateMock, successCallbackMock };
  };

  it("initialises with correct values", () => {
    const { result } = setupHook({});

    expect(result.current.campaignName).toStrictEqual("");
    expect(result.current.isSavedEnabled).toStrictEqual(false);
  });

  it("calling setCampaignName updates the campaign name", () => {
    const { result } = setupHook({});

    act(() => {
      result.current.setCampaignName("Test");
    });

    expect(result.current.campaignName).toStrictEqual("Test");
  });

  it("adding a campaign button enables the save button", () => {
    const { result } = setupHook({});

    act(() => {
      result.current.setCampaignName("Test");
    });

    expect(result.current.isSavedEnabled).toStrictEqual(true);
  });

  it("save button is disabled when loading", () => {
    const { result } = setupHook({ loading: true });

    act(() => {
      result.current.setCampaignName("Test");
    });

    expect(result.current.isSavedEnabled).toStrictEqual(false);
  });

  it("calling save sends a GQL mutation", () => {
    const { result, mutateMock } = setupHook({ loading: true });
    act(() => {
      result.current.setCampaignName("Test");
    });

    result.current.createCampaign();

    expect(mutateMock).toHaveBeenCalledWith({ variables: { name: "Test" } });
  });

  it("on success callback on success", async () => {
    const { result, successCallbackMock, mutateMock } = setupHook({
      loading: true,
    });

    act(() => {
      result.current.setCampaignName("Test");
    });

    result.current.createCampaign();

    await waitFor(() => {
      expect(successCallbackMock).toHaveBeenCalledWith("123");
    });
  });
});
