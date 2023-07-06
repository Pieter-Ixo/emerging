import { ISupamotoCookingSumaryContent } from "@/types/supamoto";

export default function calculateTotalCookingTime(
  summary: ISupamotoCookingSumaryContent[] | undefined
): string | undefined {
  if (!summary) return undefined;

  const totalCookingTime =
    summary?.reduce(
      (acc, sessionOrIDunnoWhatIsThis) =>
        acc + sessionOrIDunnoWhatIsThis.duration.total,
      0
    ) || 0;

  const totalCookingTimeString = new Date(totalCookingTime * 1000)
    .toISOString()
    .substring(11, 16);

  return totalCookingTimeString;
}
