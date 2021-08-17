import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen } from "shared";
import { TagGroup } from "../TagGroup";

describe("TagGroup", () => {
  const tags = [
    "tag-1",
    "tag-2",
    "tag-3",
    "tag-4",
    "tag-5",
    "tag-6",
    "tag-7",
    "tag-8",
  ];
  it("should display provided tags when no limit is set", () => {
    render(<TagGroup tags={tags} />);
    tags.forEach((tag) => expect(screen.getByText(tag)).toBeVisible());
  });

  it("should display allowed number only when display limit is set", () => {
    // Setup
    const limit = 3;

    // Run
    render(<TagGroup tags={tags} displayLimit={limit} />);

    // Assert
    tags.forEach((tag, index) => {
      index < limit
        ? expect(screen.getByText(tag)).toBeVisible()
        : expect(screen.queryByText(tag)).not.toBeInTheDocument();
    });
  });

  describe('"show all tags" button', () => {
    it("should be visible when limit is less than tag count", () => {
      // Setup
      const limit = 3;

      // Run
      render(<TagGroup tags={tags} displayLimit={limit} />);

      // Assert
      expect(screen.getByLabelText(/show all tags/i)).toBeVisible();
    });
    it("should not be visible when limit is greater than or equal to tag count", () => {
      // Setup
      const limit = 8;

      // Run
      render(<TagGroup tags={tags} displayLimit={limit} />);

      // Assert
      expect(screen.queryByLabelText(/show all tags/i)).not.toBeInTheDocument();
    });
    it("should display all tags when clicked", () => {
      // Setup
      const limit = 1;

      // Run
      render(<TagGroup tags={tags} displayLimit={limit} />);
      userEvent.click(screen.getByLabelText(/show all tags/i));

      // Assert
      tags.forEach((tag) => expect(screen.getByText(tag)).toBeVisible());
    });
  });

  it("should call the onTagClick function with the tag name when a tag is clicked", () => {
    const tagClickMock = jest.fn();
    render(<TagGroup tags={tags} onTagClick={tagClickMock} />);

    const tag = screen.getByText("tag-1");

    fireEvent.click(tag);

    expect(tagClickMock).toHaveBeenCalledWith("tag-1");
  });
});
