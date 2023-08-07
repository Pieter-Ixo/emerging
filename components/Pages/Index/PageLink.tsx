import { PropsWithChildren } from "react";
import { Anchor, Container } from "@mantine/core";

import { palette } from "@/theme/palette";

export default function PageLink({
  href,
  children,
}: { href?: string } & PropsWithChildren) {
  return (
    <Anchor
      href={href}
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
  );
}
