import { act, renderHook, screen, useModal } from "shared";
import { ModalProvider } from "shared/ModalProvider";

describe("AddItemModal", () => {
  const setUpComponent = () => {
    const rendered = renderHook(() => useModal(), { wrapper: ModalProvider });
    return rendered;
  };

  it("displays a modal when open modal is ran", async () => {
    const { result } = setUpComponent();

    act(() => {
      result.current.openModal(<div>Test Modal Content</div>);
    });

    expect(screen.getByText("Test Modal Content")).toBeInTheDocument();
    expect(screen.getByTestId("modal-overlay")).toBeInTheDocument();
  });

  it("displays nothing when the modal hasn't been opened", async () => {
    setUpComponent();

    expect(screen.queryByTestId("modal-overlay")).not.toBeInTheDocument();
  });

  it("closes the modal when the close function is ran", async () => {
    const { result } = setUpComponent();

    act(() => {
      result.current.openModal(<div>Test Modal Content</div>);
      result.current.closeModal();
    });

    expect(screen.queryByText("Test Modal Content")).not.toBeInTheDocument();
    expect(screen.queryByTestId("modal-overlay")).not.toBeInTheDocument();
  });
});
