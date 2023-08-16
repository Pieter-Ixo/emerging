import { Text, Flex, Image, Anchor, AnchorProps } from "@mantine/core";
import { palette } from "@/theme/palette";
import { PropsWithChildren } from "react";
import Link from "next/link";

export function FieldText({ children }: PropsWithChildren) {
  return (
    <Text fw={400} sx={{ fontSize: 13 }} color={palette.darkestBlue}>
      {children}
    </Text>
  );
}
export function FieldAnchor({
  children,
  href,
  target,
  ...props
}: AnchorProps & { href: string; target?: "_blank" | undefined }) {
  return (
    <Link href={href} target={target}>
      <Anchor fw={400} sx={{ fontSize: 13 }} {...props}>
        {children}
      </Anchor>
    </Link>
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
