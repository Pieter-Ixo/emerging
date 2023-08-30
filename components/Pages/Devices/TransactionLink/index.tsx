import { Text } from "@mantine/core";
import Link from "next/link";

import { palette } from "@/theme/palette";
import shortStr from "@/utils/shortStr";

export default function TransactionLink() {
  return (
    <Link href="google.com" target="_blank">
      <Text color={palette.fullBlue}>{shortStr("123412341234", 11, 4)}</Text>
    </Link>
  );
}
