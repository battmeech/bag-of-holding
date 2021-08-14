import userEvent from "@testing-library/user-event";
import { render, screen } from "shared";
import TagInput from "../TagInput";

describe("TagInput", () => {
  it("should render a text input field", () => {
    render(<TagInput />);
    expect(screen.getByRole("textbox")).toBeVisible();
  });

  it("should render tags provided as props", () => {
    const tags = ["a", "b"];
    render(<TagInput tags={tags} />);
    tags.forEach((tag) => expect(screen.getByText(tag)).toBeVisible());
  });

  describe("onTagsChanged", () => {
    it("should be called with selected tag removed on tag delete", () => {
      const tags = ["a", "b"];
      const changeMock = jest.fn();
      render(<TagInput tags={tags} onTagsChanged={changeMock} />);
      userEvent.click(screen.getAllByLabelText(/close/i)[0]);
      expect(changeMock).toHaveBeenCalledWith(["b"]);
    });
    it("should be called with added tag when tag is added", () => {
      const tags = ["a", "b"];
      const changeMock = jest.fn();
      render(<TagInput tags={tags} onTagsChanged={changeMock} />);
      userEvent.type(screen.getByRole("textbox"), "tag{space}");
      expect(changeMock).toHaveBeenCalledWith(["a", "b", "tag"]);
    });

    it("should not be called when the text input is empty and the user presses space or enter", () => {
      const tags = ["a", "b"];
      const changeMock = jest.fn();
      render(<TagInput tags={tags} onTagsChanged={changeMock} />);
      userEvent.type(screen.getByRole("textbox"), "{enter}");
      expect(changeMock).not.toHaveBeenCalledWith();
    });
  });
});
