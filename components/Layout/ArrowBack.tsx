import { useRouter } from "next/navigation";
import { Box } from "@mantine/core";

import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";

export default function ArrowBack() {
  const router = useRouter();

  return (
    <Box
      sx={{ position: "absolute", top: 48, cursor: "pointer" }}
      onClick={() => router.back()}
    >
      <ArrowLeftIcon />
    </Box>
  );
}
