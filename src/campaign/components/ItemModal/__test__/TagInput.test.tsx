import userEvent from "@testing-library/user-event";
import { render, screen } from "shared";
import { TagInput } from "../TagInput";

describe("TagInput", () => {
  it("should render a text input field", () => {
    // Setup/Run
    render(<TagInput />);

    // Assert
    expect(screen.getByRole("textbox")).toBeVisible();
  });

  it("should render tags provided as props", () => {
    // Setup
    const tags = ["a", "b"];

    // Run
    render(<TagInput tags={tags} />);

    // Assert
    tags.forEach((tag) => expect(screen.getByText(tag)).toBeVisible());
  });

  describe("onTagsChanged", () => {
    it("should be called with selected tag removed on tag delete", () => {
      // Setup
      const tags = ["a", "b"];
      const changeMock = jest.fn();

      // Run
      render(<TagInput tags={tags} onTagsChanged={changeMock} />);
      userEvent.click(screen.getAllByLabelText(/close/i)[0]);

      // Assert
      expect(changeMock).toHaveBeenCalledWith(["b"]);
    });
    it("should be called with added tag when tag is added", () => {
      // Setup
      const tags = ["a", "b"];
      const changeMock = jest.fn();

      // Run
      render(<TagInput tags={tags} onTagsChanged={changeMock} />);
      userEvent.type(screen.getByRole("textbox"), "tag{space}");

      // Assert
      expect(changeMock).toHaveBeenCalledWith(["a", "b", "tag"]);
    });

    it("should not be called when the text input is empty and the user presses space or enter", () => {
      // Setup
      const tags = ["a", "b"];
      const changeMock = jest.fn();

      // Run
      render(<TagInput tags={tags} onTagsChanged={changeMock} />);
      userEvent.type(screen.getByRole("textbox"), "{enter}");

      // Assert
      expect(changeMock).not.toHaveBeenCalledWith();
    });
  });
});
