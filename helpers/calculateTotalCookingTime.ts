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

  const timeObj = new Date(totalCookingTime * 1000);
  const h = timeObj.getHours();
  const min = timeObj.getMinutes();

  return `${h}h ${min}min`;
}
