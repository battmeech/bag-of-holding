import userEvent from "@testing-library/user-event";
import { render, screen } from "shared";
import TagGroup from "../TagGroup";

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
    const limit = 3;
    render(<TagGroup tags={tags} displayLimit={limit} />);
    tags.forEach((tag, index) => {
      index < limit
        ? expect(screen.getByText(tag)).toBeVisible()
        : expect(screen.queryByText(tag)).not.toBeInTheDocument();
    });
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
      tags.forEach((tag) => expect(screen.getByText(tag)).toBeVisible());
    });
  });
});
