import { PropsWithChildren } from "react";
import { Anchor, Container } from "@mantine/core";

import { palette } from "@/theme/palette";
import Link from "next/link";

export default function PageLink({
  href,
  children,
}: PropsWithChildren<{ href: string }>) {
  return (
    <Link href={href}>
      <Anchor
        underline={false}
        color={palette.Black}
        display="block"
        size="32px"
        mb={32}
        lh="lg"
      >
        <Container
          ta="center"
          p={20}
          bg={palette.White}
          sx={{ borderRadius: "16px" }}
          w="300px"
        >
          {children}
        </Container>
      </Anchor>
    </Link>
  );
}
