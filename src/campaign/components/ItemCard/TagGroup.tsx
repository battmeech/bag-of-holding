import {
  BadgeProps,
  IconButton,
  Tag,
  useBoolean,
  Wrap,
  WrapProps,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CgMore, CgMoreAlt } from "react-icons/cg";

type TagGroupProps = {
  displayLimit?: number;
  onTagClick?: (tag: string) => void;
  tags: string[];
} & Pick<BadgeProps, "variant" | "colorScheme"> &
  WrapProps;

export const TagGroup: React.FC<TagGroupProps> = ({
  displayLimit,
  tags,
  variant,
  colorScheme,
  onTagClick = () => {},
  ...wrapProps
}) => {
  const [showAll, setShowAll] = useBoolean(false);
  const [displayedTags, setDisplayedTags] = useState(tags);
  useEffect(() => {
    const displayedTags =
      displayLimit && !showAll ? tags.filter((_, i) => i < displayLimit) : tags;
    setDisplayedTags(displayedTags);
  }, [tags, displayLimit, showAll]);

  const numHidden = displayLimit ? tags.length - displayLimit : tags.length;

  return (
    <Wrap {...wrapProps}>
      {displayedTags.map((tag) => (
        <Tag
          cursor="pointer"
          onClick={() => onTagClick(tag.toLowerCase())}
          key={tag}
          variant={variant}
          colorScheme={colorScheme}
        >
          {tag.toLowerCase()}
        </Tag>
      ))}
      {numHidden > 0 && (
        <IconButton
          aria-label={showAll ? "hide tags" : "show all tags"}
          size="xs"
          icon={showAll ? <CgMoreAlt /> : <CgMore />}
          variant="link"
          onClick={setShowAll.toggle}
        />
      )}
    </Wrap>
  );
};
