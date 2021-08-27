import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen } from "shared";
import { TagGroup } from "../TagGroup";

describe("TagGroup", () => {
  const tags = [
    "tag-1",
    "TAG-2",
    "tag-3",
    "tag-4",
    "tag-5",
    "tag-6",
    "tag-7",
    "tag-8",
  ];
  it("should display provided tags when no limit is set", () => {
    render(<TagGroup tags={tags} />);
    tags.forEach((tag) =>
      expect(screen.getByText(tag.toLowerCase())).toBeVisible()
    );
  });

  it("should display allowed number only when display limit is set", () => {
    const limit = 3;

    render(<TagGroup tags={tags} displayLimit={limit} />);

    tags.forEach((tag, index) => {
      index < limit
        ? expect(screen.getByText(tag.toLowerCase())).toBeVisible()
        : expect(screen.queryByText(tag)).not.toBeInTheDocument();
    });
  });

  it("should call the onTagClick function with the tag name when a tag is clicked", () => {
    const tagClickMock = jest.fn();
    render(<TagGroup tags={tags} onTagClick={tagClickMock} />);

    const tag = screen.getByText("tag-1");

    fireEvent.click(tag);

    expect(tagClickMock).toHaveBeenCalledWith("tag-1");
  });

  it("should call the onTagClick with lower case value", () => {
    const tagClickMock = jest.fn();
    render(<TagGroup tags={tags} onTagClick={tagClickMock} />);

    const tag = screen.getByText("tag-2");

    fireEvent.click(tag);

    expect(tagClickMock).toHaveBeenCalledWith("tag-2");
  });

  describe('"show all tags" button', () => {
    it("should be visible when limit is less than tag count", () => {
      const limit = 3;

      render(<TagGroup tags={tags} displayLimit={limit} />);

      expect(screen.getByLabelText(/show all tags/i)).toBeVisible();
    });

    it("should not be visible when limit is greater than or equal to tag count", () => {
      const limit = 8;

      render(<TagGroup tags={tags} displayLimit={limit} />);

      expect(screen.queryByLabelText(/show all tags/i)).not.toBeInTheDocument();
    });

    it("should display all tags when clicked", () => {
      const limit = 1;

      render(<TagGroup tags={tags} displayLimit={limit} />);
      userEvent.click(screen.getByLabelText(/show all tags/i));

      tags.forEach((tag) =>
        expect(screen.getByText(tag.toLowerCase())).toBeVisible()
      );
    });
  });
});
