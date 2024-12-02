import {
  ActionIcon,
  ActionIconProps,
  Button,
  ButtonProps,
} from "@mantine/core";
import { IconArrowLeft, IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const ICON_SIZE = 28;

type Props = { type: "icon" | "text" } & ButtonProps & ActionIconProps;

export const BackBtn = ({ type, ...others }: Props) => {
  const { back } = useRouter();
  const handleClick = () => {
    back();
  };

  return type === "text" ? (
    <Button
      leftSection={<IconChevronLeft size={ICON_SIZE} />}
      onClick={handleClick}
      title="Go back"
      color="dark"
      variant="subtle"
      {...others}
    >
      Back
    </Button>
  ) : (
    <ActionIcon
      onClick={handleClick}
      title="Go back"
      color="dark"
      variant="subtle"
      {...others}
    >
      <IconArrowLeft size={ICON_SIZE} />
    </ActionIcon>
  );
};
