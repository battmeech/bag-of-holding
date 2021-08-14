import {
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  TagProps,
  Wrap,
} from "@chakra-ui/react";
import { KeyboardEventHandler, useState } from "react";

export type TagInputProps = {
  // eslint-disable-next-line no-unused-vars
  onTagsChanged?: (tags: string[]) => void;
  tags?: string[];
} & TagProps;

export const TagInput: React.FC<TagInputProps> = ({
  tags = [],
  onTagsChanged,
  ...tagProps
}) => {
  const [value, setValue] = useState("");
  const removeTag = (tag: string) => {
    onTagsChanged?.(tags.filter((storedTag) => storedTag !== tag));
  };
  const addTag = (tag: string) => {
    const tagSet = new Set(tags);
    tagSet.add(tag);
    onTagsChanged?.([...tagSet]);
  };
  const handleKeyDown: KeyboardEventHandler = ({ key, target }) => {
    const trimmedValue = (target as HTMLInputElement).value.trim();
    if (trimmedValue && (key === " " || key === "Enter")) {
      addTag(trimmedValue);
      setValue("");
    }
  };
  return (
    <>
      <Input
        placeholder="enter tags..."
        value={value}
        onKeyDown={handleKeyDown}
        onChange={(e) => setValue(e.target.value)}
      />
      <Wrap mt="2">
        {tags.map((tag) => (
          <Tag {...tagProps} key={tag}>
            <TagLabel>{tag.toLowerCase()}</TagLabel>
            <TagCloseButton
              aria-label={`remove tag '${tag}'`}
              onClick={() => removeTag(tag)}
            />
          </Tag>
        ))}
      </Wrap>
    </>
  );
};
