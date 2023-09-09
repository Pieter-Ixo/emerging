import { Text } from "@mantine/core";
import Link from "next/link";

import { palette } from "@/theme/palette";
import shortStr from "@/utils/shortStr";

export default function TransactionLink() {
  return (
    <Link href="/" target="_blank">
      <Text color={palette.accentActive}>{shortStr("123412341234", 11, 4)}</Text>
    </Link>
  );
}
