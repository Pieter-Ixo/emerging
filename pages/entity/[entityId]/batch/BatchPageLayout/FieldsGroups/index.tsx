import { Text, Flex, Image, Anchor, AnchorProps } from "@mantine/core";
import { palette } from "@/theme/palette";
import { PropsWithChildren } from "react";

export function FieldText({ children }: PropsWithChildren) {
  return (
    <Text fw={400} sx={{ fontSize: 13 }} color={palette.darkestBlue}>
      {children}
    </Text>
  );
}
export function FieldAnchor({
  children,
  ...props
}: AnchorProps & { href: string; target?: "_blank" | undefined }) {
  return (
    <Anchor
      fw={400}
      sx={{ fontSize: 13 }}
      {...props}
    >
      {children}
    </Anchor>
  );
}

export function FieldsGroupTitle({
  children,
  icon,
}: PropsWithChildren & { icon: string }) {
  return (
    <Flex
      sx={{
        borderBottom: `1px solid ${palette.Black}`,
        paddingBottom: "8px",
        marginBottom: "8px",
      }}
      gap={8}
      align="center"
    >
      <Image width={24} height={24} src={icon} alt="" />
      <Text
        fw={400}
        sx={{ fontSize: 13 }}
        color={palette.darkestBlue}
        transform="uppercase"
      >
        {children}
      </Text>
    </Flex>
  );
}

export default function PagePlug() {
  return null;
}
