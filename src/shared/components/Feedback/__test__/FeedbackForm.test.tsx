import fetch from "cross-fetch";
import { fireEvent, render, waitFor } from "shared";
import { FeedbackForm, IssueType } from "../FeedbackForm";

jest.mock("cross-fetch");

describe("FeedbackForm", () => {
  const setupComponent = ({
    issueType = "bug",
    responseStatus = 200,
  }: {
    issueType?: IssueType;
    responseStatus?: number;
  }) => {
    const onSuccess = jest.fn();
    const rendered = render(
      <FeedbackForm issueType={issueType} onSuccess={onSuccess} />
    );

    const inputTitle = (title: string) => {
      const titleInput = rendered.getByPlaceholderText(
        `${issueType} title`
      ) as HTMLInputElement;

      fireEvent.change(titleInput, {
        target: { value: title },
      });

      return titleInput;
    };

    const inputContent = (title: string) => {
      const contentInput = rendered.getByPlaceholderText(
        `provide as much detail as possible about the ${issueType}`
      ) as HTMLInputElement;

      fireEvent.change(contentInput, {
        target: { value: title },
      });

      return contentInput;
    };

    const clickSubmit = () => {
      fireEvent.click(rendered.getByText(`submit ${issueType}`));
    };

    (fetch as jest.Mock).mockReturnValueOnce({ status: responseStatus });

    return { ...rendered, inputTitle, inputContent, clickSubmit, onSuccess };
  };

  it("updates the values when a user types", () => {
    const { inputTitle, inputContent } = setupComponent({});
    const titleInput = inputTitle("unique name");
    const contentInput = inputContent("unique content");

    expect(titleInput.value).toStrictEqual("unique name");
    expect(contentInput.value).toStrictEqual("unique content");
  });

  it("creates a bug when submitting", async () => {
    const { inputTitle, inputContent, clickSubmit } = setupComponent({
      issueType: "bug",
    });
    inputTitle("unique name");
    inputContent("unique content");

    clickSubmit();

    await waitFor(() => {
      expect(fetch as jest.Mock).toHaveBeenCalledWith("/api/issues/bug", {
        body: '{"title":"unique name","content":"unique content"}',
        method: "POST",
      });
    });
  });

  it("creates a feature on submitting", async () => {
    const { inputTitle, inputContent, clickSubmit } = setupComponent({
      issueType: "feature",
    });
    inputTitle("unique name");
    inputContent("unique content");

    clickSubmit();

    await waitFor(() => {
      expect(fetch as jest.Mock).toHaveBeenCalledWith("/api/issues/feature", {
        body: '{"title":"unique name","content":"unique content"}',
        method: "POST",
      });
    });
  });

  it("prevents the user from submitting with blank fields", async () => {
    const { clickSubmit } = setupComponent({});

    clickSubmit();

    await waitFor(() => {
      expect(fetch as jest.Mock).not.toHaveBeenCalled();
    });
  });

  it("creates a feature on submitting", async () => {
    const { inputTitle, inputContent, clickSubmit, onSuccess } = setupComponent(
      {
        issueType: "feature",
      }
    );
    inputTitle("unique name");
    inputContent("unique content");

    clickSubmit();

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith();
    });
  });
});
