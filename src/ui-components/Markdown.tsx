import ReactMarkdown from "react-markdown";
import { FC } from "react";
import { Heading } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/react";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

type MarkdownProps = {
  text: string;
};

export const Markdown: FC<MarkdownProps> = ({ text }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkBreaks, remarkGfm]}
      components={{
        h1: (props) => (
          <Heading as="h1" size="2xl">
            {props.children}
          </Heading>
        ),
        h2: (props) => (
          <Heading as="h2" size="xl">
            {props.children}
          </Heading>
        ),
        h3: (props) => (
          <Heading as="h3" size="lg">
            {props.children}
          </Heading>
        ),
        h4: (props) => (
          <Heading as="h4" size="md">
            {props.children}
          </Heading>
        ),
        h5: (props) => (
          <Heading as="h5" size="sm">
            {props.children}
          </Heading>
        ),
        h6: (props) => (
          <Heading as="h6" size="xs">
            {props.children}
          </Heading>
        ),
        br: () => <chakra.br />,
      }}
    >
      {text.replace(/\n/gi, "&nbsp; \n")}
    </ReactMarkdown>
  );
};
